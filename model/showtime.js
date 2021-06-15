var mongoose = require('mongoose');

var showtimeSchema = new mongoose.Schema({
    movie: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        },
        name: String
    },
    cinema : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cinema'
        },
        name: String,
        theater: String
    },
    time: String ,
    seat: {type:Array, default:[
        ['A0',  'A1',  'A2',  'A3',  'A4',  'A5'],
        ['B0',  'B1',  'B2',  'B3',  'B4',  'B5'],
        ['C0',  'C1',  'C2',  'C3',  'C4',  'C5'],
        ['D0',  'D1',  'D2',  'D3',  'D4',  'D5'],
        ['E0',  'E1',  'E2',  'E3',  'E4',  'E5'],
        ['F0',  'F1',  'F2',  'F3',  'F4',  'F5'],
        ['G0',  'G1',  'G2',  'G3',  'G4',  'G5'],
        ]} 
});

module.exports = mongoose.model('Showtime',showtimeSchema); 