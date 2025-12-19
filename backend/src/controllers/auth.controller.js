const User = require("../models/User.js");
const Employee = require("../models/Employee.js");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await user.matchPassword(req.body.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );
  res.json({ token });
};

exports.register = async (req, res) => {
  const { name, email, password, role, department, designation, managerId } = req.body;

  const user = await User.create({ email, password, role });

  const employee = await Employee.create({
    user: user._id,
    name,
    email,
    department,
    designation,
    manager: managerId || null,
  });

  res.status(201).json({ user, employee });
};
