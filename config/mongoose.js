const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Here Database is connected using Mongoose
mongoose.connect('mongodb://0.0.0.0:27017/hospital_API', { useNewUrlParser: true ,useUnifiedTopology: true });
const db = mongoose.connection;

// Here Error Handling connection is checked
db.on('error', console.error.bind(console, "Error!! in Connecting to db"));

// Here Error Connection is checked
db.once('open', function () {
    console.log("db is connected successfully");
});