
//
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/contact_list_db");

var db = mongoose.connection;
db.on('error',console.log.bind(console,'connection error'));

db.once('open',function(){
    console.log("Connected to database successfully");
});
