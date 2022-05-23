const express = require('express');
const blogPostController = require('../../controllers/blogPostController');
const authToken = require('../../middlewares/authToken');
// const { validate } = require('../../middlewares/categoriesMiddleware');

const blogPostRouter = express.Router();

blogPostRouter.get('/', authToken, blogPostController.getAll);
blogPostRouter.get('/:id', authToken, blogPostController.getById);

module.exports = blogPostRouter;