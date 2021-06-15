var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    email:String,
    profileImage:{type: String, default:"/uploads/user/picture-1622449399189.png"},
    password: String,
    mylists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mylist'
        }
    ],
    isAdmin :{type: Boolean, default:false},
    booking: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        }
    ],
    
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);