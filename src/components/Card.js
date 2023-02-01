import { photoView, photo, photoTitle } from "../utils/constants.js";

/*

Поработайте с функциональностью работы карточек и валидации форм. 
Всю валидацию форм вы до этого писали в отдельном файле, 
а работу карточек — в другом. Теперь преобразуйте функции, 
которые существовали ранее, в единое целое — классы Card и FormValidator. 
В этом пункте задания поговорим про класс Card.
Организуйте в классе Card код, который создаёт карточку с текстом и ссылкой 
на изображение:
принимает в конструктор её данные и селектор её template-элемента;
содержит приватные методы, которые работают с разметкой, 
устанавливают слушателей событий;
содержит приватные методы для каждого обработчика;
содержит один публичный метод, который возвращает полностью работоспособный 
и наполненный данными элемент карточки.
Для каждой карточки создайте экземпляр класса Card. 
Когда дойдёте до реализации классов Popup, свяжите класс Card c попапом. 
Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. 
При клике на карточку эта функция должна открывать попап с картинкой.

*/




export default class Card {
  constructor(card) {
    this._text = card.name;
    this._image = card.link;
    this._like = card.likes.length;
  }

  _getElement() {
    const cardTemplate = document.querySelector('#place-card').content;
    const placeCard = cardTemplate.querySelector('.place').cloneNode(true);
    return placeCard;
  }

  generate() {
    this._element = this._getElement();
    this.#setEventListener(); //1. Необходимо навесить событие открытия popup фотокарточки
    this._element.querySelector('.place__image').src = this._image;
    this._element.querySelector('.place__image').alt = this._text;
    this._element.querySelector('.place__title').textContent = this._text;
    this._element.querySelector('.place__number').textContent = this._like;

    // Необходимо добавить условия сравнения ID автора карточки и ID user'a 
    this._element.querySelector('.place__delete'); //deleteBtn
    
    // Необходимо добавить условия сравнения ID лайка и ID user'a
    this._element.querySelector('.place__button'); //likeButton


      
      //2. При нажатии на удаление навесить событие удаления
      //3. При нажатии на лайк навесить событие лайка

    return this._element;
  }




  #handlePopupOpened() {
    // openPopup(photoView);
    // photo.src = this._image;
    // photo.alt = this._text;
    // photoTitle.textContent = this._text;
  }

  #handlePopupClosed() {
    // closePopup(photoView);
    // photo.src = '';
    // photo.alt = '';
    // photoTitle.textContent = '';
  }

  #setEventListener() {
    this._element.querySelector('.place__image').addEventListener('click', () => {
      this.#handlePopupOpened;
    })
  }
}
