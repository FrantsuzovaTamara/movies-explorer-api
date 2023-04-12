const REGEXP_URL = /^http[s]{0,1}:\/\/[a-z0-9@!$&'-._~:/?#[\]@!$&()*+,;=]{5,}/;
const VALID_ERR_MESSAGE = 'Проверьте введённые данные';
const CONFL_ERR_MESSAGE = 'Пользователь с такой почтой уже зарегистрирован';
const NOT_FOUND_ERR_MESSAGE = 'Данные не найдены';
const UNAUTH_ERR_MESSAGE = 'Необходима авторизация';
const FORBID_ERR_MESSAGE = 'Вы не можете удалить фильм другого пользователя';

module.exports = {
  REGEXP_URL,
  VALID_ERR_MESSAGE,
  CONFL_ERR_MESSAGE,
  NOT_FOUND_ERR_MESSAGE,
  UNAUTH_ERR_MESSAGE,
  FORBID_ERR_MESSAGE,
};
