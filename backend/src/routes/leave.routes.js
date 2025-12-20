const router = require("express").Router();
const {
  applyLeave,
  getLeaves,
  approveLeave,
  rejectLeave,
} = require("../controllers/leave.controller");

const { protect, authorize } = require("../middleware/auth.middleware");

// Employee / Manager apply leave
router.post("/apply", protect, authorize("EMPLOYEE", "MANAGER"), applyLeave);

// Get leaves (role-based inside controller)
router.get("/", protect, getLeaves);

// Approve / Reject
router.post("/approve/:id", protect, authorize("ADMIN", "MANAGER"), approveLeave);
router.post("/reject/:id", protect, authorize("ADMIN", "MANAGER"), rejectLeave);

module.exports = router;
