const router = require("express").Router();
const {
  createEmployee,
  getEmployees
} = require("../controllers/employee.controller");

router.post("/", createEmployee);
router.get("/", getEmployees);

module.exports = router;
