const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'password';

const jwtConfig = {
  expiresIn: '50m',
  algorithm: 'HS256',
};

const generateJWT = (payload) => {
  const token = jwt.sign({ data: payload }, JWT_SECRET, jwtConfig);

  return token;
};

module.exports = generateJWT;