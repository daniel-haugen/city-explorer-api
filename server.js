'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const weatherObject = require('./data/weather.json');

app.use(cors());

const PORT = process.env.PORT;

function Forecast(day) {
  this.description = day.weather.description;
  this.date = day.valid_date;
}

app.get('/weather', (request, response) => {
  const weather = weatherObject.data.map(day => new Forecast(day));
  response.send(weather);
});


app.listen(PORT, () => console.log('server is live!'));


