const express = require('express');
const authorization = require('./controllers/authorization');

const routes = require('express.Router()');

// -------------------------- AUTHORIZATION ---------------------------------- //

routes.route('/spotifyLogin')
  .post(authorization.spotifyLogin)