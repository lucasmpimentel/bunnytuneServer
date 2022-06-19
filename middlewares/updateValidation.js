const CustomError = require('../utils/CustomError');
const usersService = require('../services/usersService');
const joi = require('joi');

const updateSchema = joi.object({
  isActive: joi.boolean(),
  name: joi.string().min(3),
  email: joi.string().regex(/^[\w.-]+@[\w.-]+\.[\w]+(\.[\w]+)?$/i),
  userPassword: joi.string(),
}).messages({
  'string.min': 'É necessário que {#label} tenha ao menos {#limit} caracteres',
  'string.regex': 'O {#label} está no formato errado'
});

const updateValidation = async (req, _res, next) => {
  const { id } = req.params;
  const update = req.body;
  const user = await usersService.findById(id);
  if (user.length === 0) throw new CustomError(404, 'Não encontrado');
  if (update.email) {
    const checkDoubleMail = await usersService.findAll();
    const result = checkDoubleMail.filter((user) => user.email === update.email);
    if (result.length > 0 && result.id !== id) {
      throw new CustomError(422, 'O email inserido ja esta cadastrado');
    }
  }
  const { error } = updateSchema.validate({
    ...update,
  });

  if (error) throw new CustomError(422, error.message);

  next()
};

module.exports = updateValidation
