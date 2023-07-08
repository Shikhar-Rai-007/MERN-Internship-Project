const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  attendance:[
    {
      date:{
        type:Date,
        default:Date.now
      },
      status:{
        type:String,
        default:"Absent"
      }
    }
  ]
});

module.exports = mongoose.model('Student', studentSchema);
