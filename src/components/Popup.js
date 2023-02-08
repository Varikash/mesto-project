class Popup {
  constructor(popup) {
    this._popup = popup;
    this._handleEscCloseBound = this._handleEscClose.bind(this);
  }

  open () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscCloseBound);
  }

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscCloseBound);
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

export default Popup