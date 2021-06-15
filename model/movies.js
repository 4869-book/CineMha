var mongoose = require('mongoose');

var moviesSchema = new mongoose.Schema({
    name: String,
    poster: String,
    date: { type: Date, default: Date.toString },
    teaser: String,
    genre:String,
    rate:String,
    time:String,
    synosis: String,
    director: String,
    cast: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    showtimes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Showtime'
        }
    ],
    boxoffice: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Boxoffice'
        }
    ]  
});

module.exports = mongoose.model('Movie',moviesSchema);