const jwt = require('jsonwebtoken');
const Doctor = require("../models/doctorModel")

// Here Bearer Token is verified
exports.verifyToken = async (req, res, next) => {

    console.log("Bearer Token"+req.headers['authorization']);
  let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      console.log("TOKEN : "+token);
      req.token = token;
    }
    // Incase Token not found
    if (!token) {
      console.log("Error!! in Token");
      return res.status(401).json({
        success: false,
        message: "Unauthroized access"
      });
    }
  
    // Try catch is used here...
    try {

      const decoded = await jwt.verify(token, 'secret'); // Here Token is decoded
      console.log("!!Decoded Token : "+decoded);
     
      req.doctor = await Doctor.findById(decoded.id); // Here Doctor is find by id
      next();

    } catch (err) { 
      console.log(err);
      return res.status(401).json({
        success: false,
        message: "Unauthroized access"
      });
    }
  };

