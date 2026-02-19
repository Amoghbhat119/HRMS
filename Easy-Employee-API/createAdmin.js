require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user-model');
 // adjust path if needed

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
  .then(async () => {
    console.log("Connected to DB");

    const existing = await User.findOne({ email: "admin@gmail.com" });
    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = new User({
      name: "System Admin",
      email: "admin@gmail.com",
      username: "admin",
      mobile: 9876543210,
      password: "admin123",
      type: "admin",
      status: "active"
    });

    await admin.save();
    console.log("Admin created successfully");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
