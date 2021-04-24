'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());
const movieHandler = require('./components/movie');
const weatherHandler = require('./components/weather');
const errorHandler = require('./components/error');




const PORT = process.env.PORT || 3002;


app.get('/', (request, response) => {
  response.send('Root');
});

app.get('/weather', weatherHandler);
app.get('/movie', movieHandler);
app.get('*', errorHandler);

app.listen(PORT, () => console.log('server is live!'));



