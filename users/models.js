const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const WrongCredentialsError = require('../errors/wrong-credentials-error');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [isEmail, 'Неверный формат Email-а'],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new WrongCredentialsError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new WrongCredentialsError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
