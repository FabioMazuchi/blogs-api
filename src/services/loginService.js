const { User } = require('../database/models');

const validBody = (email, password) => {
  const erro = { status: 400, message: 'Some required fields are missing' };
  if (!email || !password) throw erro;
};

const login = async (email, password) => {
  const erro = { status: 400, message: 'Invalid fields' };
  validBody(email, password);

  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) throw erro;

  return user;
};

module.exports = {
  login,
};
