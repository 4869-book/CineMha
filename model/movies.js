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
    ] 
});

module.exports = mongoose.model('Movie',moviesSchema);