var express = require('express'),
  router  = express.Router({mergeParams: true}),
  multer = require('multer'),
  path = require('path'),
  storage = multer.diskStorage({
            destination: function(req, file, callback){
            callback(null,'./public/uploads/user/');
          },
      filename: function(req, file, callback){
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
     }
        }),
  imageFilter = function (req, file, callback){
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return callback(new Error('Only JPG, jpeg, PNGm and GIF image files are allowed!'), false);
    }
    callback(null, true);
    },
  upload  = multer({storage: storage, fileFilter: imageFilter}),
  middleware = require('../middleware'),
  User = require('../model/user');


/* GET home page. */
router.get('/',middleware.isLoggedIn, function(req, res, next) {
    User.findById(req.user._id).populate('mylists').populate('booking').exec(function(err, foundUser){
        if(err){
            console.log(err);
        } else {
          
          res.render('account/index.ejs',{collection: foundUser, query: req.query });
        }
    });  
});

router.post('/:id', middleware.isLoggedIn, function(req, res){
  User.findById(req.user._id, function(err, foundCollection){
      if(err){
          console.log(err);
          res.redirect('/movies');
      } else {
        console.log(req.params.id)
        foundCollection.mylists.push(req.params.id);
        foundCollection.save();
        res.redirect('/account?path=mylist');
        
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
  User.findByIdAndUpdate(req.user._id,{$pull:{mylists:req.params.mylist_id}}, function(err){
    if(err){
      console.log(err);
      
    }else{
      res.redirect('back');
    }
  })
})

module.exports = router;
