const jwt = require('jsonwebtoken');
const CustomError = require('../../utils/CustomError');
const loginConfig = require('../../config/login.config');
const usersService = require('../../services/usersService');

const secret = loginConfig.secret;

const validateToken = async (req, _res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) throw new CustomError(401, 'Token não encontrado');
    jwt.verify(token, secret, (err, decoded) => {
      if(err) throw new CustomError(401, 'Token inválido');
      req.user = decoded.data
    });
  const user = await usersService.findById(req.user.id);
  if (!user) throw new CustomError(401, 'Erro ao procurar cadastro');
  
} catch (error) {
    throw new CustomError(error.status, error.message);
  }
  next();
};

module.exports = validateToken;
