'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const superagent = require('superagent');
const movieHandler = require('./components/movie');
const weatherHandler = require('./components/weather');
const errorHandler = require('./components/error');

app.use(cors());

const PORT = process.env.PORT;


app.get('/', (request, response) => {
  response.send('Root');
});

app.get('/weather', weatherHandler);
app.get('/movie', movieHandler);
app.get('*', errorHandler);

app.listen(PORT, () => console.log('server is live!'));
