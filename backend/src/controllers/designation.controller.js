const Designation = require("../models/Designation");

exports.createDesignation = async (req, res) => {
  try {
    const desig = await Designation.create(req.body);
    res.status(201).json(desig);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getDesignations = async (req, res) => {
  try {
    const designations = await Designation.find().populate("department");
    res.json(designations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
