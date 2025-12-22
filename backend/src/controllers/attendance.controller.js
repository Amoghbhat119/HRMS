const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");
const Employee = require("../models/Employee");
const mongoose = require("mongoose");

// normalize date to midnight
const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/* ================= ADMIN – MANUAL MARK ================= */
const markAttendance = async (req, res) => {
  try {
    const { employeeId, status } = req.body;
    const today = normalizeDate(new Date());

    const attendance = await Attendance.findOneAndUpdate(
      { employee: employeeId, date: today },
      { employee: employeeId, date: today, status },
      { upsert: true, new: true }
    ).populate("employee", "name");

    res.json(attendance);
  } catch {
    res.status(500).json({ message: "Attendance marking failed" });
  }
};

/* ================= EMPLOYEE / MANAGER – CHECK IN ================= */
const checkIn = async (req, res) => {
  try {
    if (req.user.role === "ADMIN") {
      return res.status(403).json({ message: "Admin cannot check in" });
    }

    if (!req.employee) {
      return res.status(400).json({ message: "Employee profile not found" });
    }

    const today = normalizeDate(new Date());

    // 🔴 FIX 1 — prevent double check-in
    const existing = await Attendance.findOne({
      employee: req.employee._id,
      date: today,
    });

    if (existing?.checkInTime) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    // approved leave check
    const onLeave = await Leave.findOne({
      employee: req.employee._id,
      status: "APPROVED",
      fromDate: { $lte: today },
      toDate: { $gte: today },
    });

    if (onLeave) {
      return res
        .status(400)
        .json({ message: "You are on approved leave today" });
    }

    const attendance = await Attendance.findOneAndUpdate(
      { employee: req.employee._id, date: today },
      {
        employee: req.employee._id,
        date: today,
        status: "PRESENT",
        checkInTime: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json({ message: "Checked in successfully", attendance });
  } catch {
    res.status(500).json({ message: "Check-in failed" });
  }
};

/* ================= EMPLOYEE / MANAGER – CHECK OUT ================= */
const checkOut = async (req, res) => {
  try {
    if (req.user.role === "ADMIN") {
      return res.status(403).json({ message: "Admin cannot check out" });
    }

    if (!req.employee) {
      return res.status(400).json({ message: "Employee profile not found" });
    }

    const today = normalizeDate(new Date());

    const attendance = await Attendance.findOne({
      employee: req.employee._id,
      date: today,
    });

    if (!attendance || !attendance.checkInTime) {
      return res.status(400).json({ message: "No check-in found today" });
    }

    if (attendance.checkOutTime) {
      return res.status(400).json({ message: "Already checked out" });
    }

    attendance.checkOutTime = new Date();
    await attendance.save();

    res.json({ message: "Checked out successfully", attendance });
  } catch {
    res.status(500).json({ message: "Check-out failed" });
  }
};

/* ================= EMPLOYEE HISTORY ================= */
const getAttendanceByEmployee = async (req, res) => {
  try {
    if (
      req.user.role === "EMPLOYEE" &&
      req.employee &&
      req.employee._id.toString() !== req.params.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const records = await Attendance.find({ employee: req.params.id })
      .populate("employee", "name")
      .sort({ date: -1 });

    res.json(records);
  } catch {
    res.status(500).json({ message: "Failed to fetch attendance history" });
  }
};

/* ================= ALL ATTENDANCE (ADMIN ONLY) ================= */
const getAllAttendance = async (req, res) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Admin only" }); // 🔴 FIX 2
    }

    const records = await Attendance.find()
      .populate("employee", "name")
      .sort({ date: -1 });

    res.json(records);
  } catch {
    res.status(500).json({ message: "Failed to fetch attendance" });
  }
};

/* ================= MANAGER TEAM ATTENDANCE ================= */
const getTeamAttendance = async (req, res) => {
  try {
    const team = await Employee.find({
      manager: req.employee._id,
    }).select("_id");

    const records = await Attendance.find({
      employee: { $in: team.map((e) => e._id) },
    })
      .populate("employee", "name")
      .sort({ date: -1 });

    res.json(records);
  } catch {
    res.status(500).json({ message: "Failed to fetch team attendance" });
  }
};

/* ================= MONTHLY SUMMARY ================= */
const getMonthlySummary = async (req, res) => {
  try {
    const { employeeId, month, year } = req.query;

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);

    const summary = await Attendance.aggregate([
      {
        $match: {
          employee: new mongoose.Types.ObjectId(employeeId),
          date: { $gte: start, $lte: end },
        },
      },
      {
        $group: { _id: "$status", count: { $sum: 1 } },
      },
    ]);

    res.json(summary);
  } catch {
    res.status(500).json({ message: "Summary failed" });
  }
};

module.exports = {
  markAttendance,
  checkIn,
  checkOut,
  getAttendanceByEmployee,
  getAllAttendance,
  getMonthlySummary,
  getTeamAttendance,
};
