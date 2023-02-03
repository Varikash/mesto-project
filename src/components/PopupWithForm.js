/*

Создайте класс PopupWithForm, который наследуется от Popup. Этот класс:
Кроме селектора попапа принимает в конструктор колбэк сабмита формы. 
В этом колбэке содержится метод класса Api.
Содержит приватный метод _getInputValues, который собирает 
данные всех полей формы.
Перезаписывает родительский метод setEventListeners. 
Метод setEventListeners класса PopupWithForm должен не только 
добавлять обработчик клика иконке закрытия, но и добавлять 
обработчик сабмита формы.
Перезаписывает родительский метод close, так как при закрытии попапа 
форма должна ещё и сбрасываться.
Для каждого попапа создавайте свой экземпляр класса PopupWithForm.

*/

import Popup from "./Popup.js"

class PopupWithForm extends Popup {
  constructor({popup, callback}) {
    super(popup);
    this._callback = callback;
    this._inputs = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    })
    return inputValues;
  }

  close() {
    super.close()
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callback(this._getInputValues());
    })
  } 
}

export default PopupWithForm;