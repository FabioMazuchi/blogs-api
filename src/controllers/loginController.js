const loginService = require('../services/loginService');
const generateToken = require('../utils/generateJWT');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await loginService.login(email, password);

  delete user.dataValues.password;

  const token = generateToken(user.dataValues);

  res.status(200).json({ token });
};

module.exports = {
  login,
};
