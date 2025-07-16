const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');
const loginRouter = require('./login');
const userRouter = require('./user');
const categoriesRouter = require('./categories');
const blogPostRouter = require('./blogPost');

const router = express.Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDoc, { explorer: true }));

router.use('/login', loginRouter);
router.use('/user', userRouter);
router.use('/categories', categoriesRouter);
router.use('/post', blogPostRouter);

module.exports = router;