const router = require("express").Router();
const {
  createPayroll,
  getPayroll
} = require("../controllers/payroll.controller");

router.post("/", createPayroll);
router.get("/", getPayroll);

module.exports = router;
