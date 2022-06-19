const express = require('express');

const spotifyCodeValidation = require('./middlewares/spotifyCodeValidation');
const newUserValidation = require('./middlewares/newUserValidation');
const updateValidation = require('./middlewares/updateValidation');

const authorization = require('./controllers/authorization');
const usersControllers = require('./controllers/usersControllers');


const routes = express.Router()

// -------------------------- AUTHORIZATION ---------------------------------- //

routes.route('/spotifyLogin')
  .post(spotifyCodeValidation, authorization.spotifyLogin);

routes.route('/users')
  .get(usersControllers.findAll)
  .post(newUserValidation, usersControllers.create);

routes.route('/user/:id')
  .get(usersControllers.findById)
  .put(updateValidation, usersControllers.update)
  .delete(usersControllers.deleteOne);



module.exports = routes;