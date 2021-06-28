var express = require('express');
var router = express.Router();

var Movie = require('../model/movies');
var Cinema = require('../model/cinemas');
var User = require('../model/user');
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
          User.find({}).sort({name:1}).exec(function(err, allUser){
            if(err){
                console.log(err);
            } else {
              res.render('manage/index.ejs', {allMovie: allMovie, allCinema:allCinema, allUser:allUser, query: req.query});
            }
        });
        }
    });
    }
});
});

function addMinutes(time, minsToAdd) {
  function D(J){ return (J<10? '0':'') + J;};
  var piece = time.split(':');
  var mins = piece[0]*60 + +piece[1] + +minsToAdd;

  return D(mins%(24*60)/60 | 0) + ':' + D(mins%60);  
} 

router.post('/movie/auto/:id', function(req, res){
var timestart = req.body.time
  
  Movie.findById(req.params.id).exec(function(err, foundMovie){
      var addTime = 150
      if(err){
        console.log(err);
      }else{
        Cinema.findById(req.body.auto.cinema, function(err, foundCinema){
          if(err){
            console.log(err);
            res.redirect('/manage');
          }else {
          
            for (let index = 0; index < req.body.round; index++) {
              Showtime.create(req.body.auto, function(err, showtime){
                if(err) {
                   console.log(err);
                } else {
                  showtime.time=timestart
                  showtime.movie.id = foundMovie._id;
                  showtime.movie.name = foundMovie.name;
                  showtime.cinema.id = foundCinema._id;
                  showtime.cinema.name = foundCinema.name;
                  showtime.cinema.theater = req.body.auto.theater;
                  showtime.save();
                        
                  console.log(timestart)
                  timestart=addMinutes(timestart,addTime);
                  Movie.findByIdAndUpdate(req.params.id,{$push:{showtimes:showtime}},function(err){
                    if(err){
                      console.log(err);
                    }
                      })
                    Cinema.findByIdAndUpdate(req.body.auto.cinema,{$push:{showtimes:showtime}},function(err){
                      if(err){
                        console.log(err);
                        }
                      })
                    }
                });     
          }
          
          res.redirect('/manage/2'+ "?path=allMovie");
        }

      })
    }
    
  })
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
  Cinema.findById(req.params.id, function(err, foundCinema){
      if(err){
          console.log(err);
          res.redirect('/manage');
      } else {
          Movie.findById(req.body.showtime.movie, function(err, foundMovie){
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
                    res.redirect('/manage/'+ "?path=allCinema");
                  
                }
            });
            }
          })
      }
  });
});

router.delete('/showtime/:showtime_id',function(req, res){
  Showtime.findByIdAndRemove(req.params.showtime_id, function(err,docs){
    if(err){
      console.log(err)
      res.redirect('/manage'+'?path=allMovie');
    }else {
      Movie.findByIdAndUpdate(docs.movie.id,{$pull:{showtimes:req.params.showtime_id}}, function(err){
        if(err){
          console.log(err)
          res.redirect('/manage'+'?path=allMovie');
        }else {
          Cinema.findByIdAndUpdate(docs.cinema.id,{$pull:{showtimes:req.params.showtime_id}}, function(err){
            if(err){
              console.log(err)
              res.redirect('/manage'+'?path=allMovie');
            }else {
              res.redirect('/manage?path=allMovie');
            }
          })
        }
      })
    }
  })
})

router.put('/:movie_id',function(req, res){
  Movie.findByIdAndUpdate(req.params.movie_id,{boxoffice:req.body.boxoffice},function(err){
    if(err){
      console.log(err)
    }else{
      res.redirect('back');
    }
  })
});

module.exports = router;
