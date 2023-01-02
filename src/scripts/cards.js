import { openPopup, photoView, photo, photoTitle, places } from "./modal.js";
import { deleteCard } from "./api.js";


/**
 * Функция добавления дефолтных карточек + удаление и лайки
 */
export function createCard(placeName, placeLink, userID, cardOwnerID, cardID, likes) {
  const cardTemplate = document.querySelector('#place-card').content;
  const placeCard = cardTemplate.querySelector('.place').cloneNode(true);
  const photoCard = placeCard.querySelector('.place__image');
  const deleteBtn = placeCard.querySelector('.place__delete');
  const likeNumber = placeCard.querySelector('.place__number');

  placeCard.querySelector('.place__title').textContent = placeName;
  photoCard.src = placeLink;
  photoCard.alt = placeName;

  likeNumber.textContent = likes;

  if (cardOwnerID !== userID ) {
    deleteBtn.style.display = 'none';
  }

  photoCard.addEventListener('click', () => {
    openPopup(photoView);
    photo.src = placeLink;
    photo.alt = placeName;
    photoTitle.textContent = placeName;
  })
  
  deleteBtn.addEventListener('click', async (e) => {
      deleteCard(cardID);
      e.target.closest('.place').remove();
  });
  
  return placeCard;
}

export function addInitialCards (placeName, placeLink, userID, cardOwnerID, cardID, likes) {
  const initialPlaceCards = createCard(placeName, placeLink, userID, cardOwnerID, cardID, likes);
  places.append(initialPlaceCards);
}