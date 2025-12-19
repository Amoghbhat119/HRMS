const Leave = require("../models/Leave");
const Employee = require("../models/Employee");

exports.applyLeave = async (req, res) => {
  const employee = await Employee.findOne({ user: req.user.id });

  const leave = await Leave.create({
    employee: employee._id,
    ...req.body,
  });

  res.status(201).json(leave);
};

exports.updateLeave = async (req, res) => {
  const leave = await Leave.findById(req.params.id);

  if (req.user.role === "MANAGER") {
    leave.status = "APPROVED_BY_MANAGER";
  }

  if (req.user.role === "ADMIN") {
    leave.status = req.body.status;
  }

  await leave.save();
  res.json(leave);
};

exports.getLeaves = async (req, res) => {
  const leaves = await Leave.find().populate("employee", "name");
  res.json(leaves);
};
