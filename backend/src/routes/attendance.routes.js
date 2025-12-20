const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const {
  markAttendance,
  checkIn,
  checkOut,
  getAttendanceByEmployee,
  getMonthlySummary,
} = require("../controllers/attendance.controller");

// Admin / manual marking (still works)
router.post("/mark", protect, markAttendance);

// Employee self-service attendance
router.post("/check-in", protect, checkIn);
router.post("/check-out", protect, checkOut);

// Attendance history & summary
router.get("/employee/:id", protect, getAttendanceByEmployee);
router.get("/summary", protect, getMonthlySummary);

module.exports = router;
