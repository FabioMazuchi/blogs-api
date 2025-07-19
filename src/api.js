const express = require('express');
const router = require('./router');
const cors = require('cors');

const erroMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(cors({ 
    origin: '*',
    allowedHeaders: '*',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
    exposedHeaders: '*',
}));

app.use(express.json());

app.use(router);

app.use(erroMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
