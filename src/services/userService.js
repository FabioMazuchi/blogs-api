const { User } = require('../database/models');

const create = async (displayName, email, password, image) => {
  const user = await User.findOne({ where: { email } });
  const erroUser = { status: 409, message: 'User already registered' };

  if (user !== null || user) throw erroUser; 

  const newUser = await User.create({ displayName, email, password, image });

  return newUser;
};

const getAll = async () => {
  const users = await User.findAll({ 
    attributes: { exclude: ['password'] },
  });

  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(
    id,
    { attributes: { exclude: ['password'] } },
  );

  const erro = { status: 404, message: 'User does not exist' };

  if (user === null) throw erro;
  
  return user;
};

const excluir = async (id) => {
  await getById(id);
  await User.destroy({ where: { id } });
};

module.exports = {
  create,
  getAll,
  getById,
  excluir,
};