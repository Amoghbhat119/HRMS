const router = require("express").Router();
const {
  getEmployees,
} = require("../controllers/employee.controller");

const { protect } = require("../middleware/auth.middleware");

router.get("/", protect, getEmployees);

module.exports = router;
