const Movie = require('./models');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const {ErrorMessagesEnum} = require('../constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id).orFail(new NotFoundError(ErrorMessagesEnum.FILM_NOT_FOUND))
    .then((card) => {
      if (card.owner._id.toString() === req.user._id.toString()) {
        return card.remove();
      }
      throw new ForbiddenError(ErrorMessagesEnum.FILM_NOT_OWNER);
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
