const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: { title: "Turbofy API", version: "0.0.1" },
        servers: [{ url: "http://localhost:8080" }]
    },
    apis: ["src/routes/commentsRoutes.js", "src/routes/songsRoutes.js"]
};

const swaggerDocs = (app, port) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerSpec)));
}

module.exports = { swaggerDocs };