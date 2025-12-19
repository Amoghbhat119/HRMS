const router = require("express").Router();
const {
  createDesignation,
  getDesignations
} = require("../controllers/designation.controller");

router.post("/", createDesignation);
router.get("/", getDesignations);

module.exports = router;
