const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  month: String,
  year: Number,
  netSalary: Number
});

module.exports = mongoose.model("Payroll", payrollSchema);
