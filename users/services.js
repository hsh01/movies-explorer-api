const bcrypt = require('bcryptjs');
const User = require('./models');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const { ErrorMessagesEnum } = require('../constants');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

function UserErrorHandler(next) {
  return (err) => {
    if (err.code === 11000) {
      return next(new ConflictError(ErrorMessagesEnum.EMAIL_ALREADY_EXISTS));
    }
    if (err.name === 'ValidationError') {
      return next(new BadRequestError(err.message));
    }
    return next(err);
  };
}

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
    .catch(UserErrorHandler(next));
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { name, email },
    {
      runValidators: true,
      new: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ErrorMessagesEnum.USER_NOT_FOUND);
      }
      return res.send(user);
    })
    .catch((UserErrorHandler(next)));
};
