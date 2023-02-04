/*

Класс UserInfo отвечает за управление информацией о пользователе на странице. 
Этот класс:
Принимает в конструктор объект с селекторами двух элементов: 
элемента имени пользователя и элемента информации о себе.
Содержит публичный метод getUserInfo, который возвращает объект с данными 
пользователя. Данные для этого метода нужно получать от методов 
класса Api — подумайте над тем, как внедрить метод класса Api в getUserInfo.
Когда данные пользователя нужно будет подставить в форму при открытии — метод
вам пригодится.
Содержит публичный метод setUserInfo, который принимает новые данные 
пользователя, отправляет их на сервер и добавляет их на страницу.

*/

class UserInfo {
  constructor(name, about, avatar) {
    this._name = name;
    this._about = about;
    this._avatar = avatar
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo(data) {
    if (data.name) {
      this._name.textContent = data.name;
    }
    if (data.about) {
      this._about.textContent = data.about;
    }
    if (data.avatar) {
      this._avatar.src = data.avatar;
    }
    if (data._id) {
      this.userID = data._id;
    }
  }
}

export default UserInfo