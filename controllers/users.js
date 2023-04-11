const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

const { JWT_SECRET } = require('../utils/config');
const { CONFL_ERR_MESSAGE, VALID_ERR_MESSAGE, NOT_FOUND_ERR_MESSAGE } = require('../utils/constants');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFL_ERR_MESSAGE));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError(VALID_ERR_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: '7d',
        }),
      });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_ERR_MESSAGE);
      }
      return res.send({ user });
    })
    .catch(next);
};

module.exports.changeUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_ERR_MESSAGE);
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFL_ERR_MESSAGE));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError(VALID_ERR_MESSAGE));
      } else {
        next(err);
      }
    });
};
