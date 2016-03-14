var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var juicer = require('juicer');
var fs = require('fs');

var file_manager = require('./routes/file_manager');
var layout_manager = require('./routes/layout_manager');
var blocks_manager = require('./routes/blocks_manager');
var block_manager = require('./routes/block_manager');
var floor_manager = require('./routes/floor_manager');
var model_manager = require('./routes/model_manager');
var data_manager = require('./routes/data_manager');
var page_manager = require('./routes/page_manager');

var test_manager = require('./routes/test_manager');

var edit_model_manager = require('./routes/edit_model_manager');

var layouteditmodel_manager = require('./routes/layouteditmodel_manager');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/layout', layout_manager);
app.use('/blocks', blocks_manager);
app.use('/block', block_manager);
app.use('/floor', floor_manager);
app.use('/file', file_manager);
app.use('/model', model_manager);
app.use('/data', data_manager);
app.use('/page', page_manager);
app.use('/layouteditmodel_manager', layouteditmodel_manager);
app.use('/edit_model_manager', edit_model_manager);
app.use('/test_manager', test_manager);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
