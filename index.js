// Dependencies are imported
const express = require('express');
const port = 7000; // Port Number 
const db = require('./config/mongoose');//Database connection

const passport = require('passport');
const passportJWT = require('./config/passport_jwt_strategy');

// App is started
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));

// Route's are redirected
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) { console.log('error'); return; } // It prints error if it occurs. 
    
    console.log(`Server running successfully on Port Number - ${port}`);
});
