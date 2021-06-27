var mongoose = require('mongoose');

var cinemasSchema = new mongoose.Schema({
    name: String,
    location: String,
    theater: String,
    picture: String,
    showtimes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Showtime'
        }
    ]
});

module.exports = mongoose.model('Cinema',cinemasSchema);