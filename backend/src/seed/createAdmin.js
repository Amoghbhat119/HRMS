const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({ role: "ADMIN" });
    if (existingAdmin) {
      console.log("❌ Admin already exists");
      process.exit(0);
    }

    const admin = await User.create({
      email: "admin@hrms.com",
      password: "admin123", // plain text (model hashes it)
      role: "ADMIN"
    });

    console.log("✅ Admin created successfully");
    console.log("Email:", admin.email);
    console.log("Password: admin123");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
