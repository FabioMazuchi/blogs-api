const express = require('express');
const userController = require('../../controllers/userController');
const { validate } = require('../../middlewares/userMiddleware');
const authToken = require('../../middlewares/authToken');

const userRouter = express.Router();

userRouter.post('/', validate, userController.create);
userRouter.get('/', authToken, userController.getAll);

module.exports = userRouter;