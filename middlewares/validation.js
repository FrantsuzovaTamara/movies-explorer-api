const { Joi, celebrate } = require('celebrate');
const REGEXP_URL = require('../utils/constants');

const checkValidityId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

const checkValidityMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(RegExp(REGEXP_URL)),
    trailerLink: Joi.string().required().regex(RegExp(REGEXP_URL)),
    thumbnail: Joi.string().required().regex(RegExp(REGEXP_URL)),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const checkValidityNewUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(3).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const checkValidityUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(3).max(30),
    email: Joi.string().required().email(),
  }),
});

const checkValidityLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  checkValidityId,
  checkValidityMovie,
  checkValidityUser,
  checkValidityNewUser,
  checkValidityLogin,
};
