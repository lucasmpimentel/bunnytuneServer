const CustomError = require('../utils/CustomError');
const usersService = require('../services/usersService');
const joi = require('joi');

const userSchema = joi.object({
  isActive: joi.boolean().required(),
  name: joi.string().min(3).required(),
  email: joi.string().regex(/^[\w.-]+@[\w.-]+\.[\w]+(\.[\w]+)?$/i).required(),
  userPassword: joi.string().required(),
}).messages({
  'any.required': '{#label} é exigido',
  'string.min': 'É necessário que {#label} tenha ao menos {#limit} caracteres',
  'any.regex': 'O {#label} está no formato errado'
});

const newUserValidation = async (req, _res, next) => {
  const { name, email, userPassword, isActive } = req.body;
  const { error } = userSchema.validate({
    isActive,
    name,
    email,
    userPassword,
  });

  if (error) {
    error.status = error.details[0].type === 'any.required' ? 400 : 422;
    throw new CustomError(error.status, error.message);
  }

  const checkDoubleMail = await usersService.findAll();
  const result = checkDoubleMail.filter((user) => user.email === email);
  if (result.length > 0) {
    throw new CustomError(422, 'Email ja cadastrado');
  }

  next();
}

module.exports = newUserValidation;