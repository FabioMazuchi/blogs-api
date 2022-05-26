const Joi = require('joi');

const validateBody = (body) =>
  Joi.object({
    name: Joi.string().required().messages({
      'string.required': '"name" is required',
    }),
  }).validate(body);

const validate = (req, res, next) => {
  const { error } = validateBody(req.body);
    
  if (error) return next(error);
  next();
};

module.exports = {
    validate,
};