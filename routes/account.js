var express = require('express');
var router  = express.Router({mergeParams: true});
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
            destination: function(req, file, callback){
            callback(null,'./public/uploads/user/');
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



var middleware = require('../middleware');
var Movie = require('../model/movies');
var User = require('../model/user');
var Mylist = require('../model/mylist');


/* GET home page. */
router.get('/',middleware.isLoggedIn, function(req, res, next) {
    User.findById(req.user._id).populate('mylists').exec(function(err, foundMylist){
        if(err){
            console.log(err);
        } else {
            res.render('account/index.ejs',{collection: foundMylist, query: req.query });
        }
    });  
});

router.post('/:id', middleware.isLoggedIn, function(req, res){
  User.findById(req.user._id, function(err, foundCollection){
      if(err){
          console.log(err);
          res.redirect('/movies');
      } else {
          Mylist.create({movie_id: req.params.id, movie_name: req.query.name, movie_poster: req.query.poster} , function(err, mylist){
              if(err) {
                  console.log(err);
              } else {
                foundCollection.mylists.push(mylist);
                foundCollection.save();
                res.redirect('/account?path=mylist');
              }
          });
      }
  });
});

router.put('/:user_id',upload.single('profileImage'),function(req, res){
    if(req.file){
      req.body.account.profileImage = '/uploads/user/'+req.file.filename;
    }
    User.findByIdAndUpdate(req.params.user_id, req.body.account, function(err,updateAccount){
      if(err){
        res.redirect('/account?path=profile');
      }else{
        req.flash("success","Edit Account Sucessfully!");                                                 
        res.redirect('/account?path=profile');
      }
    });
  });

router.delete('/:mylist_id',function(req,res){
  Mylist.findByIdAndDelete(req.params.mylist_id,function(err,dosc){
    if(err){
      console.log(err);
      res.redirect('/account?path=mylist');
    }else{
      res.redirect('/account?path=mylist');
    }
  })
})

module.exports = router;
