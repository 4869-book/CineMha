var mongoose = require('mongoose');

var boxofficeSchema = new mongoose.Schema({
    
    domestic : String,
    international: String,
    worldwide: String
    
});

module.exports = mongoose.model('Boxoffice', boxofficeSchema );