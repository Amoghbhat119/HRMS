const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");
const mongoose = require("mongoose");

// normalize date to 00:00:00
const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * ADMIN / MANUAL MARKING (EXISTING FEATURE - SAFE)
 */
exports.markAttendance = async (req, res) => {
  try {
    const { employeeId, status } = req.body;
    const today = normalizeDate(new Date());

    const attendance = await Attendance.findOneAndUpdate(
      { employee: employeeId, date: today },
      {
        employee: employeeId,
        date: today,
        status,
      },
      { upsert: true, new: true }
    );

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: "Attendance marking failed" });
  }
};

/**
 * EMPLOYEE LOGIN → CHECK-IN
 */
exports.checkIn = async (req, res) => {
  try {
    const employeeId = req.user._id;
    const today = normalizeDate(new Date());

    // Block if approved leave exists
    const onLeave = await Leave.findOne({
      employee: employeeId,
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
      { employee: employeeId, date: today },
      {
        employee: employeeId,
        date: today,
        status: "PRESENT",
        checkInTime: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json({ message: "Checked in successfully", attendance });
  } catch (err) {
    res.status(500).json({ message: "Check-in failed" });
  }
};

/**
 * EMPLOYEE LOGOUT → CHECK-OUT
 */
exports.checkOut = async (req, res) => {
  try {
    const employeeId = req.user._id;
    const today = normalizeDate(new Date());

    const attendance = await Attendance.findOne({
      employee: employeeId,
      date: today,
    });

    if (!attendance) {
      return res.status(400).json({ message: "No check-in found today" });
    }

    attendance.checkOutTime = new Date();
    await attendance.save();

    res.json({ message: "Checked out successfully", attendance });
  } catch (err) {
    res.status(500).json({ message: "Check-out failed" });
  }
};

/**
 * ATTENDANCE HISTORY
 */
exports.getAttendanceByEmployee = async (req, res) => {
  try {
    const records = await Attendance.find({
      employee: req.params.id,
    }).sort({ date: -1 });

    res.json(records);
  } catch {
    res.status(500).json({ message: "Failed to fetch attendance history" });
  }
};

/**
 * MONTHLY SUMMARY (FOR PAYROLL & DASHBOARD)
 */
exports.getMonthlySummary = async (req, res) => {
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
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(summary);
  } catch {
    res.status(500).json({ message: "Summary failed" });
  }
};
