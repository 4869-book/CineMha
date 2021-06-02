var express = require('express');
var router = express.Router();

var Movie = require('../model/movies');
var Comment = require('../model/comment');
var Mylist = require('../model/mylist');
var middleware = require('../middleware');


/* GET home page. */
router.get('/', function(req, res, next) {
  Movie.find({},function(err,allMovie){
    if(err){
      console.log(err);
    }else {
      res.render('manage/index.ejs', {query: req.query, allMovie:allMovie});
    }
  }).sort({
    name:1
  })
});

module.exports = router;
