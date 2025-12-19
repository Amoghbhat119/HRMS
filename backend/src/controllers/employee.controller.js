const Employee = require("../models/Employee");

exports.createEmployee = async (req, res) => {
  res.json(await Employee.create(req.body));
};

exports.getEmployees = async (req, res) => {
  res.json(await Employee.find());
};
