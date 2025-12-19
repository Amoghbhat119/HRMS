const Leave = require("../models/Leave.model");

exports.applyLeave = async (req, res) => {
  const leave = await Leave.create({
    employee: req.employeeId,
    ...req.body,
  });
  res.status(201).json(leave);
};

exports.updateLeave = async (req, res) => {
  const leave = await Leave.findById(req.params.id).populate("employee");

  if (req.user.role === "MANAGER") {
    if (leave.employee.user.toString() === req.user.id)
      return res.status(403).json({ message: "Cannot approve own leave" });
    leave.status = "APPROVED_BY_MANAGER";
  }

  if (req.user.role === "ADMIN") {
    leave.status = req.body.status;
  }

  await leave.save();
  res.json(leave);
};
