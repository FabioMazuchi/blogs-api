const express = require('express');
const blogPostController = require('../../controllers/blogPostController');
const authToken = require('../../middlewares/authToken');
const { validate, validateUpdated } = require('../../middlewares/blogPostMiddleware');

const blogPostRouter = express.Router();

blogPostRouter.post('/', authToken, validate, blogPostController.create);
blogPostRouter.get('/', authToken, blogPostController.getAll);
blogPostRouter.get('/:id', authToken, blogPostController.getById);
blogPostRouter.put('/:id', authToken, validateUpdated, blogPostController.update);

module.exports = blogPostRouter;