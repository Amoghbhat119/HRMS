const Employee = require("../models/Employee");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("user", "email role")
      .populate("manager", "name")
      .populate("department", "name");

    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch employees" });
  }
};

exports.getManagers = async (req, res) => {
  try {
    const managers = await Employee.find()
      .populate({
        path: "user",
        match: { role: "MANAGER" }
      });

    const filtered = managers.filter((m) => m.user !== null);
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch managers" });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      department,
      designation,
      manager
    } = req.body;

    if (!name || !email || !password || !role || !department || !designation) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (role === "EMPLOYEE" && !manager) {
      return res.status(400).json({ message: "Employee must have a manager" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password,
      role
    });

    const employee = await Employee.create({
      name,
      user: user._id,
      department,
      designation,
      manager: role === "EMPLOYEE" ? manager : null
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create employee" });
  }
};
