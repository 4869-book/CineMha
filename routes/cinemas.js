var express = require('express');
var router  = express.Router();
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

  router.post('/',function(req, res){
    var name = req.body.name;
    var location = req.body.location;
    var city = req.body.city;
    var picture = req.body.picture;
  
    var newCinema = {name:name, location:location, city:city,picture:picture};
    Cinema.create(newCinema, function(err, newlyCreated){
      if(err){
        console.log(err);
      }else{
        req.flash("error","Add Cinema Sucessfully!");
        res.redirect('/cinemas');
        console.log("Add Cenima Sucessfully");
      }
    })
  })

  module.exports = router;