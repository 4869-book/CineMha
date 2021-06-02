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
    Cinema.findById(req.params.id).exec(function(err, allCinema){
      if(err){
          console.log(err);
      } else {
          res.render('cinemas/show.ejs', {collection: allCinema,query: req.query});
      }
      })
   });

  module.exports = router;