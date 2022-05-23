const express = require('express');
const loginRouter = require('./login');
const userRouter = require('./user');
const categoriesRouter = require('./categories');
const blogPostRouter = require('./blogPost');

const router = express.Router();

router.use('/login', loginRouter);
router.use('/user', userRouter);
router.use('/categories', categoriesRouter);
router.use('/post', blogPostRouter);

module.exports = router;