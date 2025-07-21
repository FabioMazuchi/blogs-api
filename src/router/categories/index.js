const express = require('express');
const categoriesController = require('../../controllers/categoriesController');
const authToken = require('../../middlewares/authToken');
const { validate } = require('../../middlewares/categoriesMiddleware');

const categoriesRouter = express.Router();

categoriesRouter.use(authToken)
categoriesRouter.post('/', validate, categoriesController.create);
categoriesRouter.get('/', categoriesController.getAll);

module.exports = categoriesRouter;