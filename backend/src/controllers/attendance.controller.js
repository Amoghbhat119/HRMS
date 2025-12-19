const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

exports.markAttendance = async (req, res) => {
  const employee = await Employee.findOne({ user: req.user.id });

  const attendance = await Attendance.create({
    employee: employee._id,
    status: "PRESENT",
    checkIn: new Date().toLocaleTimeString(),
  });

  res.status(201).json(attendance);
};

exports.getAttendance = async (req, res) => {
  const data = await Attendance.find().populate("employee", "name");
  res.json(data);
};
