const URL_REGEX = /^https?:\/\/[-._~:/?#[\]!$&'()*+,;=\w\d]+$/i;
const ErrorMessagesEnum = {
  NEED_AUTH: 'Необходима авторизация',
  PAGE_NOT_FOUND: 'Страница не найдена',
  SERVER_ERROR: 'На сервере произошла ошибка',
  WRONG_URL: 'Неверная ссылка',
  FILM_NOT_FOUND: 'Запрашиваемый фильм не найден',
  FILM_NOT_OWNER: 'Невозможно удалить фильм другого пользователя',
  EMAIL_WRONG_FORMAT: 'Неверный формат Email-а',
  WRONG_CREDENTIALS: 'Неправильные почта или пароль',
  EMAIL_ALREADY_EXISTS: 'Пользователь с данным email уже существует',
  USER_NOT_FOUND: 'Запрашиваемая пользователь не найден',
};

module.exports = {
  URL_REGEX,
  ErrorMessagesEnum,
};
