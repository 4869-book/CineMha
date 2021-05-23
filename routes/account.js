var express = require('express');
var router = express.Router();
var middleware = require('../middleware');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('account/index.ejs');
});

module.exports = router;
