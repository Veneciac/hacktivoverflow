var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var mongoose = require('mongoose')
var kue = require('kue')
var queue = kue.createQueue()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var questionRouter = require('./routes/question')
var answerRouter = require('./routes/answer')

var app = express();

require('dotenv').config()
const DB = process.env.DB || 'dev'
mongoose.connect(`mongodb://localhost/hacktivOverflow-${DB}`, { useNewUrlParser: true})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var cron = require('node-cron');
var every6pm = '0 0 * * *'
 
cron.schedule(every6pm, () => {
  queue.create('email').attempts(3).save()
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questionRouter)
app.use('/answers', answerRouter)

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
