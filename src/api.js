const express = require('express');

const router = require('./router');

const erroMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());

app.use(router);

app.use(erroMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
