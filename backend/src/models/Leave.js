const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  type: String,
  fromDate: Date,
  toDate: Date,
  status: {
    type: String,
    enum: ["PENDING", "APPROVED_BY_MANAGER", "APPROVED", "REJECTED"],
    default: "PENDING",
  }
});

module.exports = mongoose.model("Leave", leaveSchema);
