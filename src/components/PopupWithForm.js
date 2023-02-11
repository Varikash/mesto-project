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