const createError = require('http-errors');
const express = require('express');
require('./models/database');

const turbofy = express();

// catch 404 and forward to error handler
turbofy.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  turbofy.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.turbofy.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

module.exports = turbofy;