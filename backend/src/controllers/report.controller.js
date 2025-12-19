const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");
const Payroll = require("../models/Payroll");

exports.employeeReport = async (req, res) => {
  res.json(await Employee.find());
};

exports.attendanceReport = async (req, res) => {
  res.json(await Attendance.find().populate("employee"));
};

exports.leaveReport = async (req, res) => {
  res.json(await Leave.find().populate("employee"));
};

exports.salaryReport = async (req, res) => {
  res.json(await Payroll.find().populate("employee"));
};
