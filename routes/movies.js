var express = require('express');
var router  = express.Router();
var Movie = require('../model/movies');

function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
    ? match[2]
    : null;
}

router.get('/', function(req, res, next) {
  Movie.find({},function(err, allMovies){
  if(err){
      console.log(err);
  } else {
      res.render('movies/index.ejs', {collection: allMovies});
  }
  })
});

router.get('/new', function(req, res ,next) {
  res.render('movies/new.ejs');
})

router.post('/',function(req, res){
  var name = req.body.name;
  var poster = req.body.poster;
  var teaser = getId(req.body.teaser);
  var date = req.body.date;
  var newMovie = {name:name, poster:poster, date:date,teaser:teaser};
  Movie.create(newMovie, function(err, newlyCreated){
    if(err){
      console.log(err);
    }else{
      req.flash("error","Add Movie Sucessfully!");
      res.redirect('/movies');
      console.log("Add Movie Sucessfully");
    }
  })
})


router.get('/:id', function(req, res){
  Movie.findById(req.params.id,function(err, foundMovie){
      if(err){
          console.log(err);
      } else {
        res.render('movies/show.ejs', {collection: foundMovie});
      }
  });
});



module.exports = router;