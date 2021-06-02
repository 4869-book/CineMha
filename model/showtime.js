var mongoose = require('mongoose');

var showtimeSchema = new mongoose.Schema({
    movie: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        },
        name: String
    },
    cinema : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cinema'
        },
        name: String
    },
    time: String
});

module.exports = mongoose.model('Showtime',showtimeSchema);