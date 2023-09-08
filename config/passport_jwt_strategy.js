const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Doctor = require('../models/doctorModel');

// Here Password Authentication is passed...
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secrethospitalkey"
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){

    // Here details of doctor is found
    Doctor.findById(jwtPayLoad._id, function(err, user){ 

        if (err){ // Here Error Handling is checked
            console.log('Error!! in finding user from JWT'); 
            return done(err,false);}

        if (user){ // Here it works only if user is found
            return done(null, user);

        }else{ // Here it works only if user is not found
            return done(null, false);
        }
        
    })

}));

module.exports = passport;
