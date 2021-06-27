var mongoose = require('mongoose');

var moviesSchema = new mongoose.Schema({
    name: String,
    poster: String,
    widePoster: String,
    date: { type: Date, default: Date.toString },
    teaser: String,
    genre:[String],
    rate:String,
    rating:String,
    userrating: Number,
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
    boxoffice: {
        domestic : { type: Number, default: 0 },
        international: { type: Number, default: 0 },
        worldwide: { type: Number, default: 0 }
    },
    
});

module.exports = mongoose.model('Movie',moviesSchema);