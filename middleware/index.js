var Movie = require('../model/movies'),
    Comment    = require('../model/comment');

var middlewareObj = {};

middlewareObj.checkCollectionOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Collection.findById(req.params.id, function(err, foundCollection){
            if(err){
                res.redirect('back');
            } else {
                if(foundCollection.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect('back');
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}



middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = middlewareObj;