const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const erro = { status: 401, message: 'Expired or invalid token' };

const validToken = (err) => {
  if (err.message === 'invalid signature' 
  || err.message === 'jwt malformed'
  || err.message === 'jwt expired') return true;
  return false;
};

const extractToken = (value) => {
  return value.split(' ')[1];
}

const authToken = async (req, res, next) => {
  try {
    const value = req.headers.authorization;
    const token = extractToken(value);
  
    if (!token) return res.status(401).json({ message: 'Token not found' });
    
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (e) {
    console.log('Auth token:', e.message);
    if (validToken(e)) next(erro); 
  }
};

module.exports = authToken;