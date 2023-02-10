
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
    this.handleDelete = this.handleDelete.bind(this);
    this._handleDeleteButton = this._handleDeleteButton.bind(this);
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

  handleLike(e, data) {
      this._element.querySelector('.place__number').textContent = data.likes.length;
      e.target.classList.toggle('place__button_active');
    
  }

  handleDelete() {
    this._element.remove();
    this._element = null;
  }

  _handleDeleteButton() {
    this._deleteCardFunction(this._card._id);
  }

  _setEventListener() {
    this._element.querySelector('.place__image').addEventListener('click', () => {
      this._handleCardClick();
    })

    this._element.querySelector('.place__delete').addEventListener('click', (evt) => {
      this._handleDeleteButton();
    })

    this._element.querySelector('.place__button').addEventListener('click', (e) => {
      this._handleButtonClick(e)
    })
  }

  _handleButtonClick(e) {
    if (e.target.classList.contains('place__button_active')) {
      this._deleteLikeFunction(e, this._card._id)
    } else {
      this._putLikeFunction(e, this._card._id)
    }
  }
}
