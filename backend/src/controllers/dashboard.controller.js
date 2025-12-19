const Employee = require("../models/Employee");
const Leave = require("../models/Leave");

exports.adminDashboard = async (req, res) => {
  res.json({
    totalEmployees: await Employee.countDocuments(),
    pendingLeaves: await Leave.countDocuments({ status: "PENDING" })
  });
};
