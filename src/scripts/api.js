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
  .then(res => getResponseData(res))
}

//запрос информации о профиле
export const fetchProfileInfo = () => {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers
  })
  .then((res) => getResponseData(res))
}

//обновляем информацию в профиле
export const refreshProfInfo = (name, about) => {
  return fetch(`${config.baseUrl}users/me`, {
  method: config.patch,
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    about: about
  })
})
.then(res => getResponseData(res))
}

//обновляем аватарку
export const refreshAvatar = (url) => {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: config.patch,
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(res => getResponseData(res))
}

//добавляем новую карточку
export const pushCard = (name, link) => {
  return fetch(`${config.baseUrl}cards`, {
    method: config.post,
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then((res) => getResponseData(res))
}

//удаляем карточку с сервера
export const deleteCard = (cardID) => {
  return fetch(`${config.baseUrl}cards/${cardID}`, {
    method: config.delete,
    headers: config.headers
  })
  .then(res => getResponseData(res))
}

//отправляем на сервер лайк
export const putLike = (cardID) => {
  return fetch(`${config.baseUrl}cards/likes/${cardID}`, {
    method: config.put,
    headers: config.headers
  })
  .then(res => getResponseData(res))
}

//удаляем лайк
export const deleteLike = (cardID) => {
  return fetch(`${config.baseUrl}cards/likes/${cardID}`, {
    method: config.delete,
    headers: config.headers
  })
  .then(res => getResponseData(res))
}


/**
 * Универсальная функция обработки ответа от сервера
 * @param {Response} response 
 * @returns data
 */
function getResponseData(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status, response.ok}`);
}

