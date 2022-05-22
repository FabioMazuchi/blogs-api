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

module.exports = {
  create,
  getAll,
};
