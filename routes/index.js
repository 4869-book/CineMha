var express = require('express');
var router = express.Router();
var User = require('../model/user');
var Movie = require('../model/movies');
var passport = require('passport');

router.get('/', function(req, res, next) {
  Movie.find({}).sort({name:1}).exec(function(err,allMovie){
    if(err){
      console.log(err);
    }else{
      Movie.find({}).sort({'boxoffice.worldwide':-1}).exec(function(err,boxoffice){
        if(err){
          console.log(err);
        }else{
          res.render('home.ejs',{allMovie:allMovie,boxoffice:boxoffice});
        }
      })
    }
  })
});

/* GET users listing. */
router.get('/register',function(req, res){
    res.render('register.ejs');
  });

  router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username,email:req.body.email,rank:"user"});
    User.register(newUser,req.body.password,function(err, user){
      if(err){
        console.log(err);
        req.flash("error","Username or Email are already registered");
        res.render('register');
      }
      passport.authenticate('local')(req, res, function(){
        res.redirect('/');
      });
    });
  });

  router.get('/login',function(req, res){
    res.render('login.ejs');
  });
  
  router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/',
    successFlash: 'You are now logged in',
    failureRedirect: '/login#',
    failureFlash: 'Invalid Username or Password.'
  }), function(res,req){
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  })

  module.exports = router;
