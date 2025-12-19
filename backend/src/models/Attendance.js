const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  date: { type: Date, default: Date.now },
  status: String,
  checkIn: String,
  checkOut: String
});

module.exports = mongoose.model("Attendance", attendanceSchema);
