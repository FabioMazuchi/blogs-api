const express = require('express');
const rescue = require('express-rescue');
const blogPostController = require('../../controllers/blogPostController');
// const authToken = require('../../middlewares/authToken');
const { validate, validateUpdated } = require('../../middlewares/blogPostMiddleware');

const blogPostRouter = express.Router();

blogPostRouter.post('/', validate, rescue(blogPostController.create));
blogPostRouter.get('/', blogPostController.getAll);
blogPostRouter.get('/search', blogPostController.search);
blogPostRouter.get('/:id', rescue(blogPostController.getById));
blogPostRouter.put('/:id', validateUpdated, rescue(blogPostController.update));
blogPostRouter.delete('/:id', rescue(blogPostController.excluir));

module.exports = blogPostRouter;