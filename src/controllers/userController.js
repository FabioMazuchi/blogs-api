const userService = require('../services/userService');
const generateToken = require('../utils/generateJWT');

const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
   
    const newUser = await userService.create(displayName, email, password, image);
  
    delete newUser.dataValues.password;
  
    const token = generateToken(newUser.dataValues);
    
    res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();

    res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userService.getById(id);

    res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

const excluir = async (req, res, next) => {
  try {
    const { id } = req.user.data;

    await userService.excluir(id);

    res.status(204).end();
  } catch (e) {
    console.log('Excluir user: ', e.message);
    next(e);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  excluir,
};
