const express = require('express');

const spotifyCodeValidation = require('./middlewares/spotifyCodeValidation');
const newUserValidation = require('./middlewares/newUserValidation');
const updateValidation = require('./middlewares/updateValidation');
const validateToken = require('./middlewares/auth/validateToken');

const authorization = require('./controllers/authorization');
const usersControllers = require('./controllers/usersControllers');
const login = require('./controllers/login');


const routes = express.Router()

// -------------------------- AUTHORIZATION ---------------------------------- //

routes.route('/login')
  .get(validateToken, login.validate)
  .post(login.makeLogin)

routes.route('/spotifyLogin')
  .post(validateToken, spotifyCodeValidation, authorization.spotifyLogin);

// --------------------------- USERS ROUTES ---------------------------------- //

routes.route('/users')
  .get(validateToken, usersControllers.findAll)
  .post(newUserValidation, usersControllers.create);

routes.route('/user/:id')
  .get(validateToken, usersControllers.findById)
  .put(validateToken, updateValidation, usersControllers.update)
  .delete(validateToken, usersControllers.deleteOne);

module.exports = routes;
