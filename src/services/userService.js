const { User } = require('../database/models');

const create = async (displayName, email, password, image) => {
  const user = await User.findOne({ where: { email } });
  const erroUser = { status: 409, message: 'User already registered' };

  if (user !== null || user) throw erroUser; 

  const newUser = await User.create({ displayName, email, password, image });

  return newUser;
};

module.exports = {
  create,
};