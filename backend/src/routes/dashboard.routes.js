const router = require("express").Router();
const { protect, authorize } = require("../middleware/auth.middleware");
const {
  adminDashboard,
  managerDashboard,
  employeeDashboard,
} = require("../controllers/dashboard.controller");

router.get("/admin", protect, authorize("ADMIN"), adminDashboard);
router.get("/manager", protect, authorize("MANAGER"), managerDashboard);
router.get("/employee", protect, authorize("EMPLOYEE"), employeeDashboard);

module.exports = router;
