var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    email:String,
    rank:String,
    password: String,
    mylists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mylist'
        }
    ]
    
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);