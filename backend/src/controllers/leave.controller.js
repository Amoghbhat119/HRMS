const Leave = require("../models/Leave");
const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");

// normalize date to midnight
const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/* ================= APPLY LEAVE ================= */
exports.applyLeave = async (req, res) => {
  try {
    if (!req.employee) {
      return res.status(400).json({ message: "Employee profile not found" });
    }

    if (!req.employee.manager) {
      return res.status(400).json({
        message: "Manager not assigned. Contact admin."
      });
    }

    const { fromDate, toDate, reason } = req.body;

    if (!fromDate || !toDate) {
      return res.status(400).json({ message: "Dates required" });
    }

    const leave = await Leave.create({
      employee: req.employee._id,
      manager: req.employee.manager,   // ✅ FIX
      fromDate,
      toDate,
      reason,
      status: "PENDING",
    });

    res.status(201).json(leave);
  } catch (error) {
    console.error("Apply Leave Error:", error);
    res.status(500).json({ message: "Leave application failed" });
  }
};


/* ================= GET LEAVES ================= */
exports.getLeaves = async (req, res) => {
  try {
    let leaves;

    if (req.user.role === "ADMIN") {
      leaves = await Leave.find()
        .populate("employee", "name")
        .sort({ createdAt: -1 });
    } 
    else if (req.user.role === "MANAGER") {
      const team = await Employee.find({
        manager: req.employee._id,
      }).select("_id");

      leaves = await Leave.find({
        employee: { $in: team.map(e => e._id) },
      })
        .populate("employee", "name")
        .sort({ createdAt: -1 });
    } 
    else {
      leaves = await Leave.find({
        employee: req.employee._id,
      })
        .populate("employee", "name")
        .sort({ createdAt: -1 });
    }

    res.json(leaves);
  } catch (error) {
    console.error("Get Leaves Error:", error);
    res.status(500).json({ message: "Failed to fetch leaves" });
  }
};

/* ================= APPROVE LEAVE ================= */
exports.approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id).populate("employee");

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    if (leave.status !== "PENDING") {
      return res.status(400).json({ message: `Already ${leave.status}` });
    }

    // MANAGER can approve only own team
    if (
      req.user.role === "MANAGER" &&
      (!leave.employee.manager ||
        leave.employee.manager.toString() !== req.employee._id.toString())
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    leave.status = "APPROVED";
    await leave.save();

    /* ✅ MARK ATTENDANCE AS LEAVE FOR EACH DAY */
    let date = normalizeDate(leave.fromDate);
    const end = normalizeDate(leave.toDate);

    while (date <= end) {
      await Attendance.findOneAndUpdate(
        {
          employee: leave.employee._id,
          date,
        },
        {
          employee: leave.employee._id,
          date,
          status: "LEAVE",
        },
        { upsert: true }
      );

      date.setDate(date.getDate() + 1);
    }

    res.json({ message: "Leave approved & attendance marked as LEAVE" });
  } catch (error) {
    console.error("Approve Leave Error:", error);
    res.status(500).json({ message: "Approval failed" });
  }
};

/* ================= REJECT LEAVE ================= */
exports.rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id).populate("employee");

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    if (leave.status !== "PENDING") {
      return res.status(400).json({ message: `Already ${leave.status}` });
    }

    if (
      req.user.role === "MANAGER" &&
      (!leave.employee.manager ||
        leave.employee.manager.toString() !== req.employee._id.toString())
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    leave.status = "REJECTED";
    await leave.save();

    res.json({ message: "Leave rejected" });
  } catch (error) {
    console.error("Reject Leave Error:", error);
    res.status(500).json({ message: "Rejection failed" });
  }
};
