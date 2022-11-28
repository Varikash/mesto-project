const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-17/',
  headers: {
    authorization: '4473f1fa-06d0-4bf8-9c17-4612fabec6aa',
    'Content-Type': 'application/json'
  }
}

//запрос дефолтных карточек
export const initialCards = () => {
  return fetch(`${config.baseUrl}cards`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status, res.ok}`);
  })
}

//запрос информации о профиле
export const profileInfo = () => {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status, res.ok}`);
  })
}