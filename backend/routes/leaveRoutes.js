const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");

// Path will be /api/leave/request
router.post("/request", leaveController.submitLeaveRequest);

module.exports = router;
