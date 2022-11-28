import { openPopup } from "./functions.js";
import { photoView, photo, photoTitle } from "./photoModal.js";
import { places } from "./placesModal.js";


/**
 * Функция добавления дефолтных карточек + удаление и лайки
 */
export function createCard(placeName, placeLink) {
  const cardTemplate = document.querySelector('#place-card').content;
  const placeCard = cardTemplate.querySelector('.place').cloneNode(true);
  const photoCard = placeCard.querySelector('.place__image');

  placeCard.querySelector('.place__title').textContent = placeName;
  photoCard.src = placeLink;
  photoCard.alt = placeName;

  photoCard.addEventListener('click', () => {
    openPopup(photoView);
    photo.src = placeLink;
    photo.alt = placeName;
    photoTitle.textContent = placeName;
  })

  placeCard.querySelector('.place__button').addEventListener('click', (e) => {
    e.target.classList.toggle('place__button_active');
  })

  placeCard.querySelector('.place__delete').addEventListener('click', (e) => {
    e.target.closest('.place').remove();
  })

  return placeCard;
}

export function addInitialCards (placeName, placeLink) {
  const initialPlaceCards = createCard(placeName, placeLink);
  places.append(initialPlaceCards);
}