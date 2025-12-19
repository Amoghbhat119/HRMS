const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  res.json(await Attendance.create(req.body));
};

exports.getAttendance = async (req, res) => {
  res.json(await Attendance.find().populate("employee"));
};
