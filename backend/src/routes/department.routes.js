const router = require("express").Router();
const {
  createDepartment,
  getDepartments
} = require("../controllers/department.controller");

router.post("/", createDepartment);
router.get("/", getDepartments);

module.exports = router;
