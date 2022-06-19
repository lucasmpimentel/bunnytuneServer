const express = require('express');
require('express-async-errors');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');
const error = require('./middlewares/error');
const db = require('./models/connection');

// ---------------------- APP Server ---------------------//

const app = express();
const PORT = 3001;
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
db.sequelize.sync().then(() => console.log("Droping and re-syncing database"));
app.use(routes);
app.use(error);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
