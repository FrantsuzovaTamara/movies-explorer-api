const Movie = require('../models/movies');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  FORBID_ERR_MESSAGE,
  VALID_ERR_MESSAGE,
  NOT_FOUND_ERR_MESSAGE,
} = require('../utils/constants');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(201).send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(VALID_ERR_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      const userMovies = movies.filter((movie) => JSON.stringify(movie.owner) === `"${req.user._id}"`);
      res.send({ userMovies });
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_ERR_MESSAGE);
      }
      if (String(movie.owner) !== req.user._id) {
        throw new ForbiddenError(FORBID_ERR_MESSAGE);
      }
      return movie
        .deleteOne()
        .then(res.send({ message: 'Фильм успешно удалён' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(VALID_ERR_MESSAGE));
      } else {
        next(err);
      }
    });
};
