// ****** Importing ****** //
const mongoose = require('mongoose');

// ****** Defining Patient Schema ****** //
const patientSchema = new mongoose.Schema({
    
  phone: {
      type: Number,
      maxlength:10,
      required: true,
      unique:true,
  },
  name: {
      type: String,
      required:true,
  },
  doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Doctor'
  }
}, {
    timestamps: true
  });

// ****** Exports ****** //
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;