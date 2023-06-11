const createError = require('http-errors');
const express = require('express');
require('./models/database');

const songsRouter = require('./routes/songsRoutes');
const commentsRouter = require('./routes/commentsRoutes');

const app = express();

// Rutas
app.use(express.json());
app.use('/', songsRouter);
app.use('/songs', songsRouter);
app.use('/comments', commentsRouter);

app.get("/url", (req, res, next) => {
  res.json(["Tony","Lisa","Michael","Ginger","Food"]);
 });

app.listen(8080, () => {
  console.log('Turbofy backend ejecutándose...');
});

module.exports = app;