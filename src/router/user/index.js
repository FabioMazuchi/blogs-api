const express = require('express');
const userController = require('../../controllers/userController');
const { validate } = require('../../middlewares/userMiddleware');

const userRouter = express.Router();

userRouter.post('/', validate, userController.create);

module.exports = userRouter;