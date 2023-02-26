const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { JWT_SECRET } = require('../config');
const { ErrorMessagesEnum } = require('../constants');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    // legacy support
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError(ErrorMessagesEnum.NEED_AUTH);
    }

    token = extractBearerToken(authorization);
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(ErrorMessagesEnum.NEED_AUTH);
  }

  req.user = payload;

  next();
};
