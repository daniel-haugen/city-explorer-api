'use strict';

const superagent = require('superagent');
const cache = require('./cache')


class Forecast {
  constructor(day) {
    this.description = day.weather.description;
    this.date = day.valid_date;
  }
}


async function weatherHandler(req, res) {
  

    const { lat, lon } = req.query;
    const baseURL = 'http://api.weatherbit.io/v2.0/forecast/daily';
    const query = {
      key: process.env.WEATHER_API_KEY,
      lat: lat,
      lon: lon
    }

    const weatherResponse = await superagent
    .get(baseURL)
    .query(query)
    .catch(error => res.status(error.message).send(error.message));


    const weatherObject = JSON.parse(weatherResponse.text);
    const weatherArray = weatherObject.data;
    const weather = weatherArray.map((day) => new Forecast(day));

    res.status(200).send(weather);

}

module.exports = weatherHandler;

