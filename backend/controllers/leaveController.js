const LeaveRequest = require("../models/LeaveRequest");

exports.submitLeaveRequest = async (req, res) => {
  try {
    const { facultyId, reason, days, dateFrom, dateTo, leaveType } = req.body;
    
    const newRequest = new LeaveRequest({
      facultyId,
      reason,
      days,
      dateFrom,
      dateTo,
      leaveType
    });

    await newRequest.save();
    res.status(201).json({ success: true, message: "Request sent to HOD" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};