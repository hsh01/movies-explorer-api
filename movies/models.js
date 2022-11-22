const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: [(value) => {
        const regex = /^https?:\/\/[-._~:/?#[\]!$&'()*+,;=\w\d]+$/mi;
        return !!value.match(regex);
      }, 'Неверная ссылка'],
    },
    trailerLink: {
      type: String,
      required: true,
      validate: [(value) => {
        const regex = /^https?:\/\/[-._~:/?#[\]!$&'()*+,;=\w\d]+$/mi;
        return !!value.match(regex);
      }, 'Неверная ссылка'],
    },
    thumbnail: {
      type: String,
      required: true,
      validate: [(value) => {
        const regex = /^https?:\/\/[-._~:/?#[\]!$&'()*+,;=\w\d]+$/mi;
        return !!value.match(regex);
      }, 'Неверная ссылка'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
