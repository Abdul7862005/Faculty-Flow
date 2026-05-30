const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  skills: [String]
});

module.exports = mongoose.model("Profile", profileSchema);