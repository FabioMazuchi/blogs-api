const data = {
  nameValid: { status: 400, message: '"name" is required' },
};

const nameExist = (name) => !name;

const verifyData = (name) => {
  if (nameExist(name)) throw data.nameValid;
};

const validate = (req, res, next) => {
  try {
    const { name } = req.body;
    
    verifyData(name);
    
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
    validate,
};