const { Joi } = require('celebrate');
const { URL_REGEX } = require('../constants');

const MovieCreateSchema = {
  body: Joi.object().keys({
    movieId: Joi.number().positive(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(URL_REGEX),
    trailerLink: Joi.string().required().regex(URL_REGEX),
    thumbnail: Joi.string().required().regex(URL_REGEX),
  }),
};

const MovieParamIdSchema = {
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
};

module.exports = { MovieCreateSchema, MovieParamIdSchema };
