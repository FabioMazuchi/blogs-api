const express = require('express');
const rescue = require('express-rescue');
const blogPostController = require('../../controllers/blogPostController');
const authToken = require('../../middlewares/authToken');
const { validate, validateUpdated } = require('../../middlewares/blogPostMiddleware');

const blogPostRouter = express.Router();

blogPostRouter.post('/', authToken, validate, rescue(blogPostController.create));
blogPostRouter.get('/', authToken, blogPostController.getAll);
blogPostRouter.get('/search', authToken, blogPostController.search);
blogPostRouter.get('/:id', authToken, rescue(blogPostController.getById));
blogPostRouter.put('/:id', authToken, validateUpdated, rescue(blogPostController.update));
blogPostRouter.delete('/:id', authToken, rescue(blogPostController.excluir));

module.exports = blogPostRouter;