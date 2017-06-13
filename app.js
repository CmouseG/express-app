var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
var redis_r = require('./routes/redis');

var app = express();

var port = process.env.MONGODB_PORT_27017_TCP_PORT;
var addr = process.env.MONGODB_PORT_27017_TCP_ADDR;
var instance = process.env.MONGODB_INSTANCE_NAME;
var password = process.env.MONGODB_PASSWORD;
var username = process.env.MONGODB_USERNAME;

// 'mongodb://user:pass@localhost:port/database'
mongoose.connect('mongodb://' + username + ':' + password +'@' + addr + ':' + port + '/' + instance);
var Records = mongoose.model('Records', { name: {type: String, default:'any'}, time: {type: Date, default: Date.now} });

// var redis = require('redis');
// var RedisStore = require('connect-redis')(express);

// var redis = require('redis');
// var RedisStore = require('connect-redis')(express);

// config redis
// app.configure(function() {
//   app.use(express.cookieParser('keyboard-cat'));
//   app.use(express.session({
//         store: new RedisStore({
//             host: process.env.REDIS_HOST || 'localhost',
//             port: process.env.REDIS_PORT || 6379,
//             db: process.env.REDIS_DB || 0
//         }),
//         cookie: {
//             expires: false,
//             maxAge: 30 * 24 * 60 * 60 * 1000
//         }
//     }));
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/redis', redis_r);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
