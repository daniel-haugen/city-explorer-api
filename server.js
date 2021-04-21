'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const weatherObject = require('./data/weather.json');

app.use(cors());

const PORT = process.env.PORT;

class Forecast {
  constructor(day) {
    this.description = day.weather.description;
    this.date = day.valid_date;
  }
}

app.get('/', (request, response) => {
  response.send('Root');
});

app.get('/weather', (request, response) => {
  try {
    const weather = weatherObject.data.map((day) => new Forecast(day));
    response.status(200).send(weather);
  } catch (error) {
    response.status(error.message).send(error.message);
  }
});

app.listen(PORT, () => console.log('server is live!'));
