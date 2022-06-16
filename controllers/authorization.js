const authorizationService = require('../services/authorizationService');

const spotifyLogin = async (req, res) => {
  const code = req.body.code
  const spotifyAPI = await authorizationService.spotifyLogin(code);
  res.status(200).json({
    accessToken: spotifyAPI.body.access_token,
    refreshToken: spotifyAPI.body.refresh_token,
    expiresIn: spotifyAPI.body.expires_in,
  });
};

module.exports = {
  spotifyLogin,
}