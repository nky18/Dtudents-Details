const mongoose = require("mongoose");

const StudentsSchema = mongoose.Schema({
    studentName: {
        type: String,
        required: true
      },
      rollNumber: {
        type: String,
        required: true
      },
      subject1: {
        type: String,
        required: true
      },
      subject2: {
        type: String,
        required: true
      },
      subject3: {
        type: String,
        required: true
      }
     
    });

module.exports = mongoose.model("StudentsDetails",StudentsSchema);