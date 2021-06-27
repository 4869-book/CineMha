var mongoose = require('mongoose');

var cinemaShowtimeSchema = new mongoose.Schema({
    
    movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        
    },
    time:[{type:String}]
    
    
});

module.exports = mongoose.model('cinemaShowtime',cinemaShowtimeSchema); 