const Payroll = require("../models/Payroll");

exports.createPayroll = async (req, res) => {
  const { basic, hra, allowances, deductions } = req.body;
  const netSalary =
    basic + hra + allowances - (deductions.pf + deductions.professionalTax);

  res.json(await Payroll.create({ ...req.body, netSalary }));
};

exports.getPayroll = async (req, res) => {
  res.json(await Payroll.find().populate("employee"));
};
