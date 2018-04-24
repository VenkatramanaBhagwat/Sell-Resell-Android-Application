var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var productRouter = require('./routes/products');

const url = 'mongodb://localhost:27017/buysell';

const connect = mongoose.connect(url);

connect.then((db) =>{
  console.log("Connected to the Server");
}).catch((err) => console.log(err));

mongoose.Promise = global.Promise;

var app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(session({
//   name: 'session-id',
//   secret: '12345-67890-09876-54321',
//   saveUninitialized: false,
//   resave: false,
//   store: new FileStore()
// }));

// app.use(passport.initialize());
// app.use(passport.session());



// app.use('/users', usersRouter);

// function auth(req,res,next){
  
//    if(!req.user){
//          var err = new Error('You are not authenticated!');
//          err.status = 403;
//          return next(err);
//        }
     
//    else{
//      next();
//    }
   
//  }
 
 
//  app.use(auth);

 app.use('/uploads', express.static('uploads'));

 app.use('/products',productRouter);
 app.use('/', indexRouter);

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));



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

module.exports = app;
