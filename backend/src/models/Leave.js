const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },

  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },

  fromDate: Date,
  toDate: Date,
  reason: String,

  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING"
  }
}, { timestamps: true });

module.exports = mongoose.model("Leave", leaveSchema);
