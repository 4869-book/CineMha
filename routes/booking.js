var express = require('express');
var router  = express.Router({mergeParams: true});


var Movie = require('../model/movies');



router.get('/:Movie_id/:showtime_id', function(req, res){
    Movie.findById(req.params.Movie_id).exec(function(err, foundMovie){
      if(err){
          console.log(err);
      } else {
        res.render('booking/index.ejs', {foundMovie: foundMovie, query: req.query});
      }
  });
  });


  module.exports = router;