const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Department",
  new mongoose.Schema({ name: String })
);
