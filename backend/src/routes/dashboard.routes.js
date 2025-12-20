const router = require("express").Router();
const { adminDashboard } = require("../controllers/dashboard.controller");

router.get("/", adminDashboard);

module.exports = router;
