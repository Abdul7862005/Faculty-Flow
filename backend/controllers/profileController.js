const Profile = require("../models/Profile");

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json({ success: true, data: profile || { skills: [] } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { skills } = req.body;
    const updatedProfile = await Profile.findOneAndUpdate(
      {},
      { skills },
      { upsert: true, new: true }
    );
    res.json({ success: true, data: updatedProfile });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};