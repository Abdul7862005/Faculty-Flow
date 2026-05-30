const StudentRecord = require("../models/Marks");

// Save or Update Marks
exports.saveMarks = async (req, res) => {
  try {
    const { roll, weekly, mid, total } = req.body;

    const record = await StudentRecord.findOneAndUpdate(
      { roll: roll.toUpperCase() },
      { weekly, mid, total },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: "Marks securely synchronized!", data: record });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get All Marks
exports.getAllMarks = async (req, res) => {
  try {
    const records = await StudentRecord.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};