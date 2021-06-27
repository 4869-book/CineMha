var mongoose = require('mongoose');

var boxofficeSchema = new mongoose.Schema({
    
    domestic : { type: Number, default: 0 },
    international: { type: Number, default: 0 },
    worldwide: { type: Number, default: 0 }
    
});

module.exports = mongoose.model('Boxoffice', boxofficeSchema );