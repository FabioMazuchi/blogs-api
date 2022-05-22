const data = {
  displayValid: { 
    status: 400, 
    message: '"displayName" length must be at least 8 characters long' },
  emailValid: { status: 400, message: '"email" must be a valid email' },
  passwordlValid: { 
    status: 400, 
    message: '"password" length must be at least 6 characters long' },  
};

// https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
const validEmail = (email) => {
  const reg = /\S+@\S+\.\S+/;
  
  return reg.test(email);
};

const displayNameSmaller = (displayName) => displayName.length < 8;
const passwordSmaller = (password) => password.length < 6;

const verifyData = (displayName, email, password) => {
  if (displayNameSmaller(displayName)) throw data.displayValid;
  if (passwordSmaller(password)) throw data.passwordlValid;
  if (!validEmail(email)) throw data.emailValid;
};

const validate = (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;
    
    verifyData(displayName, email, password);
    
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
    validate,
};