var mongoose = require('mongoose');

var mylistSchema = new mongoose.Schema({
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }
    
});

module.exports = mongoose.model('Mylist', mylistSchema);