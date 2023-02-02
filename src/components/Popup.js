/*

Создайте класс Popup, который отвечает за открытие и закрытие попапа. 
Этот класс:
*Принимает в конструктор единственный параметр — селектор попапа.

*Содержит публичные методы open и close, которые отвечают за открытие и 
закрытие попапа.

*Содержит приватный метод _handleEscClose, который содержит логику 
закрытия попапа клавишей Esc.

*Содержит публичный метод setEventListeners, 
который добавляет слушатель клика иконке закрытия попапа. 
Модальное окно также закрывается при клике на затемнённую область вокруг формы.

*/

class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners () {
    this._popup.querySelector('.popup__close-button')
    .addEventListener('click', this.close.bind(this));

    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    })
  }
}

export default Popup;