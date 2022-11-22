const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');
const auth = require('../middlewares/auth');

const authRouter = require('../auth/routes');
const userRouter = require('../users/routes');
const cardRouter = require('../movies/routes');

router.use('/', authRouter);
router.use('/users', auth, userRouter);
router.use('/movies', auth, cardRouter);

router.all('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
