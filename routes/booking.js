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
     console.log(req.body.booking)
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

  router.post('/payment/:showtime_id/confirm', function(req, res){
     console.log(req.body.booking);
     Showtime.findById(req.params.showtime_id).exec(function(err,foundShowtime){
      for (let x = 0; x < foundShowtime.seat.length; x++) {
        for(let y = 0; y < foundShowtime.seat[x].length;y++){
          req.body.booking.seat.forEach(element => {
            if(foundShowtime.seat[x][y]==element){
              foundShowtime.seat[x][y]="0";
            }    
          });        
        }
      }  
      Showtime.findByIdAndUpdate(req.params.showtime_id,foundShowtime).exec(function(err,newShowtime){
        if(err){
          console.log(err);
        }else{
          res.redirect('/booking/'+foundShowtime.movie.id+'/'+req.params.showtime_id);
        }
      })
    })
 });


  module.exports = router;