const Joi = require('joi');

const validateBody = (body) =>
  Joi.object({
    displayName: Joi.string().min(8).messages({
      'string.min': '"displayName" length must be at least 8 characters long',
    }),
    email: Joi.string().email().messages({
      'string.email': '"email" must be a valid email',
    }),
    password: Joi.string().min(6).messages({
      'string.min': '"password" length must be at least 6 characters long',
    }),
    image: Joi.string(),
  }).validate(body);

const validate = (req, res, next) => {
    const { error } = validateBody(req.body);
    
    if (error) return next(error);
    next();
};

module.exports = {
    validate,
};