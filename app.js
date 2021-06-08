var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./model/user');

// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MovieDB2', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected to databese successfuly");
});


var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');
var cinemasRouter = require('./routes/cinemas');
var indexRouter = require('./routes/index');
var promotionsRouter = require('./routes/promotions');
var newsRouter = require('./routes/news');
var accountRouter = require('./routes/account');
var manageRouter = require('./routes/manage');
var bookingRouter = require('./routes/booking');


var app = express();

var session = require('express-session');

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(session({
  secret: "You Don't Need to Know",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/movies', moviesRouter);
app.use('/users', usersRouter);
app.use('/cinemas', cinemasRouter);
app.use('/',indexRouter);
app.use('/promotions', promotionsRouter);
app.use('/news',newsRouter);
app.use('/account',accountRouter);
app.use('/manage',manageRouter);
app.use('/booking',bookingRouter);



// Specific folder example
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/patials', express.static(__dirname + 'view/patials'))
app.use(express.static('./public'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function isloggedin(req, res, next){
  if(req.isAutenticated()){
    return next();
  }
  res.redirect('/login');
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


module.exports = app;
