
export default class Card {
  constructor(card, user, template, {handleCardClick, deleteCardFunction, deleteLikeFunction, putLikeFunction}) {
    this._card = card;
    this._user = user;
    this._template = template
    this._handleCardClick = handleCardClick;
    this._deleteCardFunction = deleteCardFunction;
    this._deleteLikeFunction = deleteLikeFunction;
    this._putLikeFunction = putLikeFunction;
    this.handleLike = this.handleLike.bind(this);
    this._handleButtonClick = this._handleButtonClick.bind(this);
  }

  _getElement() {
    const placeCard = this._template.querySelector('.place').cloneNode(true);
    return placeCard;
  }

  generate() {
    this._element = this._getElement();

    this._setEventListener();

    const image = this._element.querySelector('.place__image');
    const title = this._element.querySelector('.place__title');
    const likeNumber = this._element.querySelector('.place__number');
    const deleteBtn = this._element.querySelector('.place__delete');
    const likeBtn = this._element.querySelector('.place__button');

    image.src = this._card.link;
    image.alt = this._card.name;
    title.textContent = this._card.name;
    likeNumber.textContent = this._card.likes.length;

  
    if (this._card.owner._id !== this._user) {
      deleteBtn.classList.add('place__delete_disable');
    }

    if (this._card.likes.length) {
      this._card.likes.forEach(like => {
        if (like._id == this._user) {
          likeBtn.classList.add('place__button_active');
        }
      })
    } else {
      likeNumber.textContent = 0;
    }
  
    return this._element;
  }

  handleLike(e, data, likeNumber) {
    if (data.likes.length) {
      likeNumber.textContent = data.likes.length;
      e.target.classList.toggle('place__button_active');
    }
  }


  _setEventListener() {
    this._element.querySelector('.place__image').addEventListener('click', () => {
      this._handleCardClick();
    })

    this._element.querySelector('.place__delete').addEventListener('click', (evt) => {
      try {
        this._deleteCardFunction(evt, this._card._id);
      } catch (err) {
        console.log(`Ошибка удаления карточки: ${err}`)
      }
      
    })

    this._element.querySelector('.place__button').addEventListener('click', (e) => {
      this._handleButtonClick(e)})
  }

  _handleButtonClick(e) {
    if (e.target.classList.contains('place__button_active')) {
      try {
        this._deleteLikeFunction(e, this._card._id, this._element.querySelector('.place__number'))
      } catch (err) {
        console.log(`Ошибка удаления лайка: ${err}`)
      }
    } else {
      try {
        this._putLikeFunction(e, this._card._id, this._element.querySelector('.place__number'))
      } catch (err) {
        console.log(`Ошибка установки лайка: ${err}`)
      }
    }
  }
}
