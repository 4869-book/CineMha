var express = require('express');
var router  = express.Router({mergeParams: true});


var Movie = require('../model/movies');
var Showtime = require('../model/showtime');



router.get('/:Movie_id/:showtime_id', function(req, res){
    Movie.findById(req.params.Movie_id).exec(function(err, foundMovie){
      if(err){
        console.log(err);
      } else {
        Showtime.findById(req.params.showtime_id).exec(function(err, foundShowtime){
          res.render('booking/index.ejs', {foundMovie: foundMovie,foundShowtime: foundShowtime, query: req.query});
        })
      }
  });
  });

  router.post('/payment/:showtime_id', function(req, res){
    // console.log(req.body.booking.showtime_id)
    Showtime.findById(req.params.showtime_id).exec(function(err,foundShowtime){
      if(err){
        console.log(err);
      } else{
        Movie.findById(foundShowtime.movie.id).exec(function(err,foundMovie){
          if(err){
            console.log(err);
          }else{
            res.render('booking/payment.ejs',{foundShowtime:foundShowtime,foundMovie:foundMovie,seat:req.body.booking});
          }
        })
      }
    })
  });


  module.exports = router;