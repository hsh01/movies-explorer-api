const Movie = require('./models');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).orFail(new NotFoundError('Запрашиваемый фильм не найден'))
    .then((card) => {
      if (card.owner._id.toString() === req.user._id.toString()) {
        return card.remove();
      }
      throw new ForbiddenError('Невозможно удалить фильм другого пользователя');
    })
    .then(() => res.send({ success: true }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    movieId,
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    link,
  } = req.body;
  Movie.create({
    movieId,
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    link,
    owner: req.user._id,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};
