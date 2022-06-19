const express = require('express');

const spotifyCodeValidation = require('./middlewares/spotifyCodeValidation');

const authorization = require('./controllers/authorization');


const routes = express.Router()

// -------------------------- AUTHORIZATION ---------------------------------- //

routes.route('/spotifyLogin')
  .post(spotifyCodeValidation, authorization.spotifyLogin);



module.exports = routes;