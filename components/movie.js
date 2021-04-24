"use strict";

const { response } = require("express");
const superagent = require("superagent");
const cache = require("./cache");

//move into movies.js
class Movies {
  constructor(movie) {
    this.name = movie.title;
  }
}

//move into movies.js
async function movieHandler(req, res) {
  try {
    const cityName = req.query.cityName;
    const dataAlreadyFetched = cache[cityName] !== undefined;

    if (dataAlreadyFetched && (Date.now() - cache[cityName].timestamp < 10000)) {
      const red = cache[cityName];
      console.log('from memory', cache);
      res.status(200).send(red);
      
    } else {
      const baseURL = "https://api.themoviedb.org/3/search/movie";
      const query = {
        api_key: process.env.MOVIE_API_KEY,
        query: cityName,
      };

      const movieResponse = await superagent
        .get(baseURL)
        .query(query)
        .catch((e) => console.e);

      const movieObject = JSON.parse(movieResponse.text);

      const movies = movieObject.results.map((movie) => new Movies(movie));
      cache[cityName] = movies;
      cache[cityName].timestamp = Date.now();
      res.status(200).send(movies);
    }
  } catch (err) {
    res.status(err.message).send(err.message);
  }
}

module.exports = movieHandler;
