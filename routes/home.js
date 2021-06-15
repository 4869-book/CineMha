var express = require('express');
var router = express.Router();

var Cinema = require('../model/cinemas');
var Movie = require('../model/movies');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get("/search/:key", function(req,res){
  var key = req.params.key;
  var capitalkey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
  Movie.find(
      {$or:[
          {name:{$regex:'.*' + key + '.*'}},
          {name:{$regex:'.*' + key.toUpperCase() + '.*'}},
          {name:{$regex:'.*' + key.toLowerCase()}},
          {name:{$regex:'.*' + capitalkey + '.*'}}
      ]}, function(err, foundMovie){
              if(err){
                  console.log(err);
              }else if(foundMovie){
                  Cinema.find(
                      {$or:[
                          {name:{$regex:'.*' + key + '.*'}},
                          {name:{$regex:'.*' + key.toUpperCase() + '.*'}},
                          {name:{$regex:'.*' + key.toLowerCase()}},
                          {name:{$regex:'.*' + capitalkey + '.*'}}
                      ]}, function(err, foundCinema){
                              if(err){
                                  console.log(err);
                              }else if(foundCinema){
                                res.render("home/search.ejs", {movieSearch: foundMovie, cinemaSearch: foundCinema});
                              }
                          }
                  ).sort({"name": 1});
              }    
          }
  ).sort({"name": 1});
  
});


router.post("/search", function(req,res){
  var searchkey = req.body.key;
  res.redirect("search/" + searchkey);
});

module.exports = router;
