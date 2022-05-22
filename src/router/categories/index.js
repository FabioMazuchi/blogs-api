const express = require('express');
const categoriesController = require('../../controllers/categoriesController');
const authToken = require('../../middlewares/authToken');
const { validate } = require('../../middlewares/categoriesMiddleware');

const categoriesRouter = express.Router();

categoriesRouter.post('/', authToken, validate, categoriesController.create);
categoriesRouter.get('/', authToken, categoriesController.getAll);

module.exports = categoriesRouter;