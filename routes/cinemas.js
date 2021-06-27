var express = require('express'),
    router  = express.Router(),
    multer  = require('multer'),
    path    = require('path');
var storage = multer.diskStorage({
      destination: function(req, file, callback){
      callback(null,'./public/uploads/cinema');
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
var  upload = multer({storage: storage, fileFilter: imageFilter});

var Cinema = require('../model/cinemas');
var Movie = require('../model/movies');

router.get('/', function(req, res, next) {
 Cinema.find({},function(err, allCinema){
  if(err){
      console.log(err);
  } else {
      res.render('cinemas/index.ejs', {collection: allCinema});
  }
  })
});

router.get('/new', function(req, res, next) {
    res.render('cinemas/new.ejs')
  });

  router.post('/',upload.single('picture'), function(req, res){
    req.body.collection.picture = '/uploads/cinema/'+req.file.filename;
    
    Cinema.create(req.body.collection, function(err, newlyCreated){
      if(err){
        console.log(err);
      }else{
        req.flash("error","Add Cinema Sucessfully!");
        res.redirect('/cinemas');
        console.log("Add Cenima Sucessfully");
      }
    })
  })

  router.get('/:id', function(req, res, next) {
    Cinema.findById(req.params.id).populate('showtimes').exec(function(err, allCinema){
      if(err){
          console.log(err);
      } else {
        Movie.find({}).sort({name:1}).populate('showtimes').exec(function(err, foundMovie){
          if(err){
              console.log(err);
          } else {
              res.render('cinemas/show.ejs', {collection: allCinema,foundMovie:foundMovie,query: req.query});
          }
          })
      }
      })
   });

   router.get('/:id/edit',function(req,res){
    Cinema.findById(req.params.id).exec(function(err,editThis){
      if(err){
        console.log(err);
      }else{
        res.render('manage/edit_cinema.ejs',{editThis:editThis});
      }
    })
  })

   router.put('/:cinema_id',upload.single('picture'),function(req, res){
    if(req.file){
      req.body.collection.picture = '/uploads/cinema/'+req.file.filename;
    }
    Cinema.findByIdAndUpdate(req.params.cinema_id, req.body.collection, function(err,updateCinema){
      if(err){
        res.redirect('/manage?path=allCinema');
      }else{
        req.flash("success","Edit Cinema Sucessfully!");                                                 
        res.redirect('/manage?path=allCinema');
      }
    });
  });
  
  router.delete('/:cinema_id',function(req, res){
    Cinema.findByIdAndRemove(req.params.cinema_id, function(err){
      if(err){
        res.redirect('/manage'+'?path=allCinema');
      }else {
        req.flash("success","Delete Cinema Sucessfully!");
        res.redirect('/manage/2?path=allCinema');
      }
    })
  })

  module.exports = router;