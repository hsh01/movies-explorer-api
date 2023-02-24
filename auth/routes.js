const router = require('express').Router();
const { celebrate } = require('celebrate');
const { UserCreateSchema } = require('../users/schemas');
const { login, logout } = require('./services');
const { UserAuthSchema } = require('./schemas');
const {createUser} = require('../users/services');
const auth = require('../middlewares/auth');

router.post('/signin', celebrate(UserAuthSchema), login);
router.post('/signup', celebrate(UserCreateSchema), createUser);
router.post('/signout', auth, logout);

module.exports = router;
