var express = require('express');
var router  = express.Router({mergeParams: true});
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
var Comment = require('../model/comment');
var middleware = require('../middleware');
const { move } = require('./manage');
var Cinema = require('../model/cinemas');
const Showtime = require('../model/showtime');
const Boxoffice = require('../model/boxoffice');


function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
    ? match[2]
    : null;
}

router.get('/now', function(req, res, next) {
  var mysort = {date:1};
  if(req.query.sort=="Name"){
    mysort = {name:1};
  }else if(req.query.sort=="Date"){
    mysort = {date:1};
  }else if(req.query.sort=="Rating"){
    mysort = {rating:1};
  }

  Movie.find({},function(err, allMovies){
  if(err){
      console.log(err);
  } else {
      res.render('movies/now.ejs', {collection: allMovies, query: req.query});
  }
  }).sort(mysort);
});

router.get('/coming', function(req, res, next) {
  var mysort = {date:1};
  if(req.query.sort=="Name"){
    mysort = {name:1};
  }else if(req.query.sort=="Date"){
    mysort = {date:1};
  }else if(req.query.sort=="Rating"){
    mysort = {rating:1};
  }

  Movie.find({},function(err, allMovies){
  if(err){
      console.log(err);
  } else {
      res.render('movies/coming.ejs', {collection: allMovies, query: req.query});
  }
  }).sort(mysort);
});

router.get('/new', function(req, res ,next) {
  res.render('movies/new.ejs');
})

router.post('/',upload.array('poster',2), function(req, res){
  req.body.movie.poster = '/uploads/'+req.files[0].filename;
  req.body.movie.widePoster = '/uploads/'+req.files[1].filename;
 
  req.body.movie.teaser = getId(req.body.movie.teaser);
  
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
  var flag=0
  if(req.user){
    if(req.user.mylists.includes(req.params.id)){
      flag=1
    }
  }
  Movie.findById(req.params.id).populate('comments').populate('showtimes').populate('boxoffice').exec(function(err, foundMovie){
    if(err){
        console.log(err);
    } else {
      Cinema.find({}).populate('showtimes').exec(function(err, foundCinema){
        if(err){
            console.log(err);
        } else {
          Showtime.find({}).exec(function(err, foundShowtime){
            if(err){
                console.log(err);
            } else {
              
              var score = 0
              foundMovie.comments.forEach(element => {
                score = score + element.stars
              });
              console.log(score)
              Movie.updateOne({ _id : req.params.id },
              { $set: { "userrating" : score } });
              res.render('movies/show.ejs', {collection: foundMovie,foundCinema:foundCinema,foundShowtime:foundShowtime, query: req.query,flag:flag});
            }
          });
        }
      });
    }
  });
});

router.post('/:id', middleware.isLoggedIn, function(req, res){
  Movie.findById(req.params.id, function(err, foundCollection){
      if(err){
          console.log(err);
          res.redirect('/movies');
      } else {
          Comment.create(req.body.comment, function(err, comment){
              if(err) {
                  console.log(err);
              } else {
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  comment.save();
                  foundCollection.comments.push(comment);
                  foundCollection.save();
                  res.redirect('/movies/'+ foundCollection._id + "?path=review");
              }
          });
      }
  });
});

router.get('/:id/edit',function(req,res){
  Movie.findById(req.params.id).exec(function(err,editThis){
    if(err){
      console.log(err);
    }else{
      res.render('manage/edit_movie.ejs',{editThis:editThis});
    }
  })
})

router.put('/:movie_id',upload.single('poster'),function(req, res){
  if(req.file){
    
    req.body.movie.widePoster = '/uploads/'+req.file.filename;
  }
  Movie.findByIdAndUpdate(req.params.movie_id, req.body.movie, function(err,updateMovie){
    if(err){
      res.redirect('/manage?path=allMovie');
    }else{
      req.flash("error","Edit Movie Sucessfully!");                                                 
      res.redirect('/manage?path=allMovie');
    }
  });
});

router.delete('/:movie_id',function(req, res){
  Movie.findByIdAndRemove(req.params.movie_id, function(err){
    if(err){
      res.redirect('/manage'+'?path=allMovie');
    }else {
      res.redirect('/manage?path=allMovie');
    }
  })
})

router.delete('/comment/:comment_id/:movie_id',function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err,delcomment){
    if(err){
      console.log(err)
    }else {
      Movie.findByIdAndUpdate(req.params.movie_id,{$pull:{comments:delcomment._id}},function(err){
        if(err){
          console.log(err)
        }else{
          res.redirect('back')
        }
      })
    }
  })
})






module.exports = router;