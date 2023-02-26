const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  createMovie, deleteMovie, getMovies,
} = require('./services');
const { MovieCreateSchema, MovieParamIdSchema } = require('./schemas');

router.get('/', getMovies);
router.delete('/:_id', celebrate(MovieParamIdSchema), deleteMovie);
router.post('/', celebrate(MovieCreateSchema), createMovie);

module.exports = router;
