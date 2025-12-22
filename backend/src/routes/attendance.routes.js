const router = require("express").Router();
const { protect, authorize } = require("../middleware/auth.middleware");
const {
  markAttendance,
  checkIn,
  checkOut,
  getAttendanceByEmployee,
  getMonthlySummary,
  getAllAttendance  ,
  getTeamAttendance
} = require("../controllers/attendance.controller");

// Admin only
router.post("/mark", protect, authorize("ADMIN"), markAttendance);

// Employee & Manager only
router.post("/check-in", protect, authorize("EMPLOYEE", "MANAGER"), checkIn);
router.post("/check-out", protect, authorize("EMPLOYEE", "MANAGER"), checkOut);
router.get("/team", protect, authorize("MANAGER"), getTeamAttendance);

router.get("/employee/:id", protect, getAttendanceByEmployee);
router.get("/summary", protect, getMonthlySummary);
router.get("/", protect, getAllAttendance);


module.exports = router;
