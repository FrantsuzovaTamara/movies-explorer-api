const router = require('express').Router();
const { checkValidityId, checkValidityMovie } = require('../middlewares/validation');
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', checkValidityMovie, createMovie);
router.delete('/:_id', checkValidityId, deleteMovie);

module.exports = router;
