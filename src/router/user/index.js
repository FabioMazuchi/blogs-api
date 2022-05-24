const express = require('express');
const userController = require('../../controllers/userController');
const { validate } = require('../../middlewares/userMiddleware');
const authToken = require('../../middlewares/authToken');

const userRouter = express.Router();

userRouter.post('/', validate, userController.create);
userRouter.get('/', authToken, userController.getAll);
userRouter.get('/:id', authToken, userController.getById);
userRouter.delete('/me', authToken, userController.excluir);

module.exports = userRouter;