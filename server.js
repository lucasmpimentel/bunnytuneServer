const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const spotifyWebApi = require('spotify-web-api-node');
const routes = require('./routes');

const app = express();
const PORT = 3001

app.use(bodyParser);
app.use(routes);
app.use(error);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
});
