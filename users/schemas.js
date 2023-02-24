const { Joi } = require('celebrate');

const UserCreateSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
};

const UserUpdateSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
};

module.exports = {
  UserCreateSchema, UserUpdateSchema,
};
