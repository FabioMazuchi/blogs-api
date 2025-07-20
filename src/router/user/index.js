const express = require('express');
const rescue = require('express-rescue');
const userController = require('../../controllers/userController');
const { validate } = require('../../middlewares/userMiddleware');
// const authToken = require('../../middlewares/authToken');

const userRouter = express.Router();

userRouter.post('/', validate, rescue(userController.create));
userRouter.get('/', userController.getAll);
userRouter.get('/:id', rescue(userController.getById));
userRouter.delete('/:id', rescue(userController.excluir));

module.exports = userRouter;