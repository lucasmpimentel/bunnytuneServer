const loginService = require('../services/loginService');

const makeLogin = async (req, res) => {
  const { email, password } = req.body 
  const user = await loginService.login(email, password);
  res.status(200).json(user);
}

const validate = (req, res) => {
  const user = req.user
  res.status(200).json(user);
};

module.exports = { makeLogin, validate };