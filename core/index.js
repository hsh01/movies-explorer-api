const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');
const auth = require('../middlewares/auth');

const authRouter = require('../auth/routes');
const userRouter = require('../users/routes');
const cardRouter = require('../movies/routes');
const { ErrorMessagesEnum } = require('../constants');

router.use('/', authRouter);
router.use('/users', auth, userRouter);
router.use('/movies', auth, cardRouter);

router.all('*', auth, (req, res, next) => {
  next(new NotFoundError(ErrorMessagesEnum.PAGE_NOT_FOUND));
});

module.exports = router;
