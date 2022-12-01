const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-17/',
  headers: {
    authorization: '4473f1fa-06d0-4bf8-9c17-4612fabec6aa',
    'Content-Type': 'application/json'
  },
  post: 'POST',
  patch: 'PATCH',
  put: 'PUT',
  delete: 'DELETE'
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

//обновляем информацию в профиле
export const refreshProfInfo = (name, about) => {
  fetch(`${config.baseUrl}users/me`, {
  method: config.patch,
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    about: about
  })
}); 
}

//обновляем аватарку
export const refreshAvatar = (url) => {
  fetch(`${config.baseUrl}users/me/avatar`, {
    method: config.patch,
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  }); 
}

//добавляем новую карточку
export const pushCard = (name, link) => {
  fetch(`${config.baseUrl}cards`, {
    method: config.post,
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
}

//удаляем карточку с сервера
export const deleteCard = (cardID) => {
  fetch(`${config.baseUrl}cards/${cardID}`, {
    method: config.delete,
    headers: config.headers
  })
}