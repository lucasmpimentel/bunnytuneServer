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
  if (response.body.error) throw new CustomError(
    response.statusCode, response.body.error_description
  );
  return response;
}

module.exports = {
  spotifyLogin,
}
