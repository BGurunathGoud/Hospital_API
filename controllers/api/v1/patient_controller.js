// Here Patient Model is imported
const Patient = require('../../../models/patientModel');

// Here Registation for patient is done
exports.register= async (req, res) => {

  const doctor =req.doctor._id; // Here we can get doctor id

 
    try {
      const { name, phone } = req.body; // Here name & phone can be get from body or input
      let patient;
      patient = await Patient.find({
        phone
      });

      // Here patient is created if he/she details doesn't exist
      if (patient.length > 0) {
        return res.status(200).json({
          success: true,
          body: patient[0]
        });
      }

      // Patient details are created
      patient = await Patient.create({
        name,
        phone,
        doctor
      });
      
      // It occurs after patient details are registered successfully
      return res.status(201).json({
        success: true,
        body: patient,
        msg:'Patient Registered Sucessfully!'
      });
    } catch (err) {
      return res.status(401).json({
        success: false,
        msg:'Error Occoured!'
      });
    }
  };

  