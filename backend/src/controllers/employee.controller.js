const Employee = require("../models/Employee");

exports.getEmployees = async (req, res) => {
  const employees = await Employee.find()
    .populate("user", "email role")
    .populate("manager", "name");

  res.json(employees);
};
