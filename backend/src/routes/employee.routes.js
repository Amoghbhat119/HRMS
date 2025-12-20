const router = require("express").Router();
const {
  getEmployees,
  getManagers,
  createEmployee
} = require("../controllers/employee.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/", protect, getEmployees);
router.get("/managers", protect, getManagers);
router.post("/", protect, createEmployee);

module.exports = router;
