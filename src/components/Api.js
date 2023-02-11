/**
 * Класс API выполняет запросы на сервер
 */
export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  /**
   * метод запроса дефолтных карточек
   * @returns 
   */
  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
  }

  /**
   * метод запроса информации о профиле
   * @returns 
   */
  getProfileInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
  }

  /**
   * метод обновления информации о профиле
   * @returns 
   */
  refreshProfileInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: data[Object.keys(data)[0]],
        about: data[Object.keys(data)[1]],
      })
    })
    .then(res => this._getResponseData(res))
  }

  /**
   * метод обновления аватарки
   * @param {string} url 
   * @returns 
   */
  refreshAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data[Object.keys(data)[0]]
      })
    })
    .then(res => this._getResponseData(res))
  }

  /**
   * метод добавления новой карточки
   * @param {string} name 
   * @param {string} link 
   * @returns 
   */
  pushCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: data[Object.keys(data)[0]],
        link: data[Object.keys(data)[1]]
      })
    })
    .then(res => this._getResponseData(res))
  }

  
  /**
   * метод удаления карточки с сервера
   * @param {string} cardID 
   * @returns 
   */
  deleteCard(cardID) {
    return fetch(`${this._baseUrl}cards/${cardID}`, {
      headers: this._headers,
      method: 'DELETE'
    })
    .then(res => this._getResponseData(res))
  }

  /**
   * метод постановки лайка
   * @param {string} cardID 
   * @returns 
   */
  putLike(cardID) {
    return fetch(`${this._baseUrl}cards/likes/${cardID}`, {
      headers: this._headers,
      method: 'PUT'
    })
    .then(res => this._getResponseData(res))
  }

  deleteLike(cardID) {
    return fetch(`${this._baseUrl}cards/likes/${cardID}`, {
      headers: this._headers,
      method: 'DELETE'
    })
    .then(res => this._getResponseData(res))
  }

/**
 * Приватный метод обработки данных после запроса с сервера
 * @param {object} response 
 * @returns 
 */
  _getResponseData(response) {
    return response.ok
    ?response.json()
    :Promise.reject(`Ошибка ${response.status, response.ok}`);
  }
}