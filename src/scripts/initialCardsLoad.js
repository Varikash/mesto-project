import { closePopup, openPopup } from "./functions.js";
import { photoView, photo, photoTitle } from "./photoModal.js";
import { places } from "./placesModal.js";
import { deletePopup, formDelete } from "./deleteModal.js";
import { deleteCard } from "./api.js";

/**
 * Функция добавления дефолтных карточек + удаление и лайки
 */
export function createCard(placeName, placeLink, userID, cardOwnerID, cardID) {
  const cardTemplate = document.querySelector('#place-card').content;
  const placeCard = cardTemplate.querySelector('.place').cloneNode(true);
  const photoCard = placeCard.querySelector('.place__image');
  const deleteBtn = placeCard.querySelector('.place__delete');

  placeCard.querySelector('.place__title').textContent = placeName;
  photoCard.src = placeLink;
  photoCard.alt = placeName;

  if (cardOwnerID !== userID ) {
    deleteBtn.style.display = 'none';
  }

  photoCard.addEventListener('click', () => {
    openPopup(photoView);
    photo.src = placeLink;
    photo.alt = placeName;
    photoTitle.textContent = placeName;
  })

  placeCard.querySelector('.place__button').addEventListener('click', (e) => {
    e.target.classList.toggle('place__button_active');
  })

  deleteBtn.addEventListener('click', (e) => {
    openPopup(deletePopup);
    formDelete.addEventListener('submit', () => {
      e.preventDefault();
      deleteCard(cardID)
      closePopup(deletePopup);
    })
    // e.target.closest('.place').remove();
  })

  return placeCard;
}

export function addInitialCards (placeName, placeLink, userID, cardOwnerID, cardID) {
  const initialPlaceCards = createCard(placeName, placeLink, userID, cardOwnerID, cardID);
  places.append(initialPlaceCards);
}