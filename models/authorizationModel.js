const spotifyLogin = async (code, spotifyWebApi) => {
  try {
    const data = await spotifyWebApi.authorizationCodeGrant(code);
    return data;
  } catch (error) {
    return error;
  }
}

module.exports = {
  spotifyLogin,
}