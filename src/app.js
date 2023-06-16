const createError = require('http-errors');
const express = require('express');
require('./models/database');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const songsRouter = require('./routes/songsRoutes');
const commentsRouter = require('./routes/commentsRoutes');

const app = express();

// Rutas
app.use(express.json());
app.use('/', [songsRouter, commentsRouter]);
app.use('/songs', songsRouter);
app.use('/comments', commentsRouter);

const swaggerSpec = {
  definition: {
      openapi: "3.0.0",
      info: { title: "Turbofy API", version: "0.0.1"},
      servers: [ { url: "http://localhost:8080" }]
  },
  apis: [ "swagger-docs/turbofy-api.yml" ]
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerSpec)));

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