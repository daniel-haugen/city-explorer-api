'use strict';

const superagent = require('superagent');


class Forecast {
  constructor(day) {
    this.description = day.weather.description;
    this.date = day.valid_date;
  }
}

async function weatherHandler(req, res) {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;

    const key = process.env.WEATHER_API_KEY;
    const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${key}&lat=${lat}&lon=${lon}`;

    const weatherResponse = await superagent.get(url);

    const weatherObject = JSON.parse(weatherResponse.text);
    const weatherArray = weatherObject.data;


    const weather = weatherArray.map((day) => new Forecast(day));
    res.status(200).send(weather);

  } catch (error) {
    res.status(error.message).send(error.message);
  }
}

module.exports = weatherHandler;

