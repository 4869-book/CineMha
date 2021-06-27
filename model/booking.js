var mongoose = require('mongoose');

var bookingSchema = new mongoose.Schema({
    wideposter: String,
    name: String,
    seat:[{type:String}],
    total:String,
    time:String,
    ref:String
});

module.exports = mongoose.model('Booking',bookingSchema);