var mongoose = require('mongoose');

var cinemasSchema = new mongoose.Schema({
    name: String,
    location: String,
    city: String,
    picture: String 
});

module.exports = mongoose.model('Cinema',cinemasSchema);