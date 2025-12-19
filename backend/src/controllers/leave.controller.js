const Leave = require("../models/Leave");

exports.applyLeave = async (req, res) => {
  res.json(await Leave.create(req.body));
};

exports.getLeaves = async (req, res) => {
  res.json(await Leave.find().populate("employee"));
};
