'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const superagent = require('superagent');
const weatherObject = require('./data/weather.json');

app.use(cors());

const PORT = process.env.PORT;

class Forecast {
  constructor(day) {
    this.description = day.weather.description;
    this.date = day.valid_date;
  }
}

class Movies {
  constructor(movie) {
    this.name = movie.title
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

  async function movieHandler(req, res) {
    try {
    const cityName = req.query.cityName;
    const key = process.env.MOVIE_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${cityName}`

    const movieResponse = await superagent.get(url);
    const movieObject = JSON.parse(movieResponse.text);

    const movies = movieObject.results.map(movie => new Movies(movie));

    res.send(movies);

    } catch(error){}

  }



app.get('/', (request, response) => {
  response.send('Root');
});

app.get('/weather', weatherHandler);
app.get('/movie', movieHandler);

app.listen(PORT, () => console.log('server is live!'));
