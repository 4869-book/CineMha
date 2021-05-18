var mongoose = require('mongoose');

var moviesSchema = new mongoose.Schema({
    name: String,
    poster: String,
    date: String,
    teaser: String,
    genre:String,
    rate:String,
    time:String 
});

module.exports = mongoose.model('Movie',moviesSchema);