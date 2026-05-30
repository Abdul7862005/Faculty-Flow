const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema({
  facultyId: { type: String, required: true },
  reason: { type: String, required: true },
  days: { type: Number, required: true },
  dateFrom: { type: Date, required: true },
  dateTo: { type: Date, required: true },
  leaveType: { type: String, enum: ['Casual', 'Normal', 'Emergency'], required: true },
  status: { type: String, default: "Pending" } 
});

module.exports = mongoose.model("LeaveRequest", leaveRequestSchema);