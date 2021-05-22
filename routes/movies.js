var express = require('express');
var router  = express.Router();
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
            destination: function(req, file, callback){
            callback(null,'./public/uploads/');
          },
      filename: function(req, file, callback){
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
     }
        });
var imageFilter = function (req, file, callback){
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return callback(new Error('Only JPG, jpeg, PNGm and GIF image files are allowed!'), false);
  }
  callback(null, true);
};
var upload  = multer({storage: storage, fileFilter: imageFilter});
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
  }).sort({
    date: 1,
  })
});

router.get('/new', function(req, res ,next) {
  res.render('movies/new.ejs');
})

router.post('/',upload.single('poster'), function(req, res){
  req.body.movie.poster = '/uploads/'+req.file.filename;
  req.body.movie.teaser = getId(req.body.movie.teaser);
  // var name = req.body.name;
  // var poster = req.body.poster;
  // var teaser = getId(req.body.teaser);
  // var date = req.body.date;mo
  //var newMovie = {name:name, poster:poster, date:date,teaser:teaser};
  Movie.create(req.body.movie, function(err, newlyCreated){
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