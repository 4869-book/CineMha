var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('promotions/index.ejs');
    console.log(err)
  });
  
  module.exports = router;