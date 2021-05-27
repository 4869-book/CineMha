var express = require('express');
var router = express.Router();
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

module.exports = router;
