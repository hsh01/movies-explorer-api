const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getUsers, updateUser, getMe,
} = require('./services');
const {
  UserUpdateSchema,
} = require('./schemas');

router.get('/', getUsers);
router.get('/me', getMe);
router.patch('/me', celebrate(UserUpdateSchema), updateUser);

module.exports = router;
