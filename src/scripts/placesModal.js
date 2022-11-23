const popupPlaces = document.querySelector('#new-place');//Модальное окно добавления нового места
const placeButton = document.querySelector('.profile__add-button'); //кнопка открытия модального окна
const popupPlaceName = popupPlaces.querySelector('.popup__input[name = "place-name"]');
const popupPlaceLink = popupPlaces.querySelector('.popup__input[name = "place-link"]');
const places = document.querySelector('.places__cards-grid');

export {
  popupPlaces,
  placeButton,
  popupPlaceName,
  popupPlaceLink,
  places
}