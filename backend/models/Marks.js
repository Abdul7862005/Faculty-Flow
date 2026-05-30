const mongoose = require("mongoose");

const StudentRecordSchema = new mongoose.Schema({
  roll: { 
    type: String, 
    required: true, 
    unique: true, 
    uppercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]$/.test(v);
      },
      message: props => `${props.value} is not a valid institutional roll number format!`
    }
  },
  weekly: { type: Number, required: true, min: 0, max: 5 },
  mid: { type: Number, required: true, min: 0, max: 25 },
  total: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('StudentRecord', StudentRecordSchema);