const router = require("express").Router();
const {
  employeeReport,
  attendanceReport,
  leaveReport,
  salaryReport
} = require("../controllers/report.controller");

router.get("/employees", employeeReport);
router.get("/attendance", attendanceReport);
router.get("/leaves", leaveReport);
router.get("/salary", salaryReport);

module.exports = router;
