var express = require('express'),
    router = express.Router({mergeParams: true}),
    Movie = require('../model/movies'),
    Comment = require('../models/comment');

