var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
var User = require('../model/user');

router.delete('/:user_id',function(req, res){
  User.findByIdAndRemove(req.params.user_id, function(err,docs){
    if(err){
      console.log(err)
      res.redirect('/manage'+'?path=allUser');
    }else {
      res.redirect('/manage?path=allUser');
    }
  })
})

module.exports = router;
