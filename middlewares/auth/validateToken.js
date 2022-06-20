const jwt = require('jsonwebtoken');
const CustomError = require('../../utils/CustomError');
const loginConfig = require('../../config/login.config');
const usersService = require('../../services/usersService');

const secret = loginConfig.secret;

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) throw new CustomError(401, 'Token não encontrado');
    const decoded = jwt.verify(token, secret);
    
    const user = await usersService.findById(decoded.data.id);
    if (!user) throw new CustomError(401, 'Erro ao procurar cadastro');

    req.user = user  
  } catch (error) {
    throw new CustomError(error.status, error.message);
  }
  next();
};

module.exports = validateToken;
