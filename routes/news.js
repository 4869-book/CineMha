var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('news/index.ejs');
    console.log(err)
  });
  
  module.exports = router;