const router = require("express").Router();
const { adminDashboard } = require("../controllers/dashboard.controller");

router.get("/admin", adminDashboard);

module.exports = router;
