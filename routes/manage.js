var express = require('express');
var router = express.Router();

var Movie = require('../model/movies');
var Cinema = require('../model/cinemas');
var Comment = require('../model/comment');
var Showtime = require('../model/showtime')
var middleware = require('../middleware');




router.get('/', function(req, res){
  Movie.find({}).sort({name:1}).populate('showtimes').exec(function(err, allMovie){
    if(err){
        console.log(err);
    } else {
      Cinema.find({}).sort({name:1}).populate('showtimes').exec(function(err, allCinema){
        if(err){
            console.log(err);
        } else {
          res.render('manage/index.ejs', {allMovie: allMovie, allCinema:allCinema, query: req.query});
        }
    });
    }
});
});

router.post('/movie/:id', middleware.isLoggedIn, function(req, res){
  Movie.findById(req.params.id, function(err, foundMovie){
      if(err){                                                
          console.log(err);
          res.redirect('/manage');
      } else {
          Cinema.findById(req.body.showtime.cinema, function(err, foundCinema){
            if(err){
              console.log(err);
              res.redirect('/manage');
            }else {
              Showtime.create(req.body.showtime, function(err, showtime){
                if(err) {
                    console.log(err);
                } else {
                    showtime.movie.id = foundMovie._id;
                    showtime.movie.name = foundMovie.name;
                    showtime.cinema.id = foundCinema._id;
                    showtime.cinema.name = foundCinema.name;
                    showtime.cinema.theater = req.body.showtime.theater;
                    showtime.save();
                    foundMovie.showtimes.push(showtime);
                    foundMovie.save();
                    foundCinema.showtimes.push(showtime);
                    foundCinema.save();
                    res.redirect('/manage/'+ "?path=allMovie");
                 
                }
            });
            }
          })
      }
  });
});

router.post('/cinema/:id', middleware.isLoggedIn, function(req, res){
  Cinema.findById(req.params.id, function(err, foundMovie){
      if(err){
          console.log(err);
          res.redirect('/manage');
      } else {
          Movie.findById(req.body.showtime.movie, function(err, foundCinema){
            if(err){
              console.log(err);
              res.redirect('/manage');
            }else {
              Showtime.create(req.body.showtime, function(err, showtime){
                if(err) {
                    console.log(err);
                } else {
                    showtime.movie.id = foundMovie._id;
                    showtime.movie.name = foundMovie.name;
                    showtime.cinema.id = foundCinema._id;
                    showtime.cinema.name = foundCinema.name;
                    showtime.save();
                    foundMovie.showtimes.push(showtime);
                    foundMovie.save();
                    foundCinema.showtimes.push(showtime);
                    foundCinema.save();
                    res.redirect('/manage/'+ "?path=allCinema");
                  
                }
            });
            }
          })
      }
  });
});


module.exports = router;
