'use strict';

const superagent = require('superagent');

//move into movies.js
class Movies {
  constructor(movie) {
    this.name = movie.title
  }
}

  //move into movies.js
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

  module.exports = movieHandler;