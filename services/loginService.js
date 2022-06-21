const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const CustomError = require('../utils/CustomError');
const loginConfig = require('../config/login.config')
const usersService = require('./usersService');

const secret = loginConfig.secret;
const jwtConfig = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

const login = async (email, password) => {
  try {
    const getUsers = await usersService.findAll();
    const [getUser] = getUsers.filter((user) => user.email === email);
    if (!getUser) throw new CustomError(401, 'Email ou senha incorretos');
    if (!getUser.is_active) throw new CustomError(422, 'Cadastro inativo');

    const verifyPassword = await bcrypt.compare(password, getUser.user_password);
    if (!verifyPassword) throw new CustomError(401, 'Email ou senha incorretos');

    const user = {
      id: getUser.id,
      email: getUser.email,
      name: getUser.name,
    }
    const token = jwt.sign({ data: user }, secret, jwtConfig);
    return {...user, token};
  } catch (error) {
    throw new CustomError(error.status, error.message);
  }
}

module.exports = { login };
