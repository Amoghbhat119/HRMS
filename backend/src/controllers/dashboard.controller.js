const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");

// normalize date
const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/* ================= ADMIN DASHBOARD ================= */
exports.adminDashboard = async (req, res) => {
  try {
    const today = normalizeDate(new Date());

    const totalEmployees = await Employee.countDocuments();

    const presentToday = await Attendance.countDocuments({
      date: today,
      status: "PRESENT",
    });

    const onLeaveToday = await Leave.countDocuments({
      status: "APPROVED",
      fromDate: { $lte: today },
      toDate: { $gte: today },
    });

    const pendingLeaves = await Leave.countDocuments({
      status: "PENDING",
    });

    res.json({
      totalEmployees,
      presentToday,
      onLeaveToday,   // ✅ NOW SENT
      pendingLeaves,
    });
  } catch {
    res.status(500).json({ message: "Admin dashboard failed" });
  }
};


/* ================= MANAGER DASHBOARD ================= */
exports.managerDashboard = async (req, res) => {
  try {
    const team = await Employee.find({ manager: req.employee._id });

    const teamIds = team.map(e => e._id);

    const pendingLeaves = await Leave.countDocuments({
      employee: { $in: teamIds },
      status: "PENDING",
    });

    res.json({
      teamCount: team.length,
      pendingLeaves,
    });
  } catch {
    res.status(500).json({ message: "Manager dashboard failed" });
  }
};

/* ================= EMPLOYEE DASHBOARD ================= */
exports.employeeDashboard = async (req, res) => {
  try {
    const today = normalizeDate(new Date());

    const todayAttendance = await Attendance.findOne({
      employee: req.employee._id,
      date: today,
    });

    const pendingLeaves = await Leave.countDocuments({
      employee: req.employee._id,
      status: "PENDING",
    });

    res.json({
      todayStatus: todayAttendance?.status || "NOT MARKED",
      pendingLeaves,
    });
  } catch {
    res.status(500).json({ message: "Employee dashboard failed" });
  }
};
