const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  name: String,
  email: String,
  department: String,
  designation: String,
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  status: { type: String, default: "ACTIVE" }
});

module.exports = mongoose.model("Employee", employeeSchema);
