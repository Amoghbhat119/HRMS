const router = require("express").Router();
const {
  markAttendance,
  getAttendance
} = require("../controllers/attendance.controller");

router.post("/", markAttendance);
router.get("/", getAttendance);

module.exports = router;
