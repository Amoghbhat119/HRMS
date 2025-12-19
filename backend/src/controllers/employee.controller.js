const Employee = require("../models/Employee.js");

exports.getEmployees = async (req, res) => {
  const employees = await Employee.find()
    .populate("user", "role email")
    .populate("manager", "name");
  res.json(employees);
};
