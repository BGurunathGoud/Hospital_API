// Here dependencies are importted
const Doctor=require('../../../models/doctorModel');
const jwt=require('jsonwebtoken');

// Here registeration of doctor details is done
module.exports.register = async function(req,res) {
  try {

    const doctor=  await Doctor.create(req.body);
      
      return res.status(200).json({ // It passes if doctor details are correct
          success: true,
          message:doctor
      });

  } catch (err) { 
      return res.status(500).json({
          success: false,
          message:err.message
      });
  }
}

// This is for signing of doctor with his/she details
module.exports.login= async (req, res)=>{
  try {

    let { email, password } = req.body;

    if (!email || !password) { // If doctor didn't entered any details it shows this..
      return res.status(400).json({ 
        success: false,
        msg:'No email or password'
      });
    }

    let doctor = await Doctor.findOne({ email: email });

    if (!doctor) { // It occurs only if doctor details are not found
      return res.status(401).json({ 
        success: false, 
        msg: "Invalid! Username or Password!!" 
      });
    }

    // Here passwords are checked once again
    const isMatch = await doctor.matchPassword(password);

    // Here this is for password invalid
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        msg: "Invalid Username or Password!" 
      });
    }

    // Here JWT token is taken
    const token = doctor.getSignedJwtToken();
    res.status(200).json({
      success: true,
      token,
      msg: `Log In Sucessful! Keep the Token safely  ${doctor.username}!`
    });
  } catch (error) { 
    console.log(error);
    res.status(400).json({
      success: false,
      msg:'Error Occoured!'
    });
  }
}
