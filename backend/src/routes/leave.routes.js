const router = require("express").Router();
const { applyLeave, getLeaves } = require("../controllers/leave.controller");

router.post("/", applyLeave);
router.get("/", getLeaves);

module.exports = router;
