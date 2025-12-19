const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Designation",
  new mongoose.Schema({
    title: String,
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }
  })
);
