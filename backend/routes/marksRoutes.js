const express = require("express");
const router = express.Router();
const marksController = require("../controllers/marksController");
console.log("🎯 DEBUG: marksRoutes.js file has successfully loaded into memory!");
// Maps to /api/marks/save
router.post("/save", marksController.saveMarks);

// Maps to /api/marks/all
router.get("/all", marksController.getAllMarks);

module.exports = router;