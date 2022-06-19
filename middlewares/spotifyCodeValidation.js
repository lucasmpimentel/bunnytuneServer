const CustomError = require('../utils/CustomError');

const spotifyCodeValidation = (req, _res, next) => {
  const code = req.body.code
  if (!code || code.length === 0) {
    throw new CustomError(400, 'Erro de comunicação com o Spotify')
  }

  next();
}

module.exports = spotifyCodeValidation;
