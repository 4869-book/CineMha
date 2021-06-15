var mongoose = require('mongoose');

var bookingSchema = new mongoose.Schema({
    showtimes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Showtime'
        }
    ],
    seat:String,
    total:String,
    time:String
});

module.exports = mongoose.model('Booking',bookingSchema);