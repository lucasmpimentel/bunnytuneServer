const SpotifyWebApi = require('spotify-web-api-node');
const CustomError = require('../utils/CustomError');
const authorizationModel = require('../models/authorizationModel');

const spotifyLogin = async (code) => {
  const spotifyWebApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });
  const response = await authorizationModel.spotifyLogin(code, spotifyWebApi);
  if (!response) throw new CustomError(401, 'Autorização não concedida');
  return response;
}

module.exports = {
  spotifyLogin,
}