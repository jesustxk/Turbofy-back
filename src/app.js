const createError = require('http-errors');
const express = require('express');
require('./models/database');

const songsRouter = require('./routes/songsRoutes');
const commentsRouter = require('./routes/commentsRoutes');

const app = express();

// Rutas
app.use(express.json());
app.use('/', [songsRouter, commentsRouter]);
app.use('/songs', songsRouter);
app.use('/comments', commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});

app.listen(8080, () => {
  console.log('Turbofy backend ejecutándose...');
});

module.exports = app;