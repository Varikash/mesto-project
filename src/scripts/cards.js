import { openPopup, photoView, photo, photoTitle, places } from "./modal.js";
import { deleteCard } from "./api.js";


/**
 * Функция добавления дефолтных карточек + удаление и лайки
 */
export function createCard(placeName, placeLink, userID, cardOwnerID, cardID, likes, cardLikes) {
  const cardTemplate = document.querySelector('#place-card').content;
  const placeCard = cardTemplate.querySelector('.place').cloneNode(true);
  const photoCard = placeCard.querySelector('.place__image');
  const deleteBtn = placeCard.querySelector('.place__delete');
  const likeNumber = placeCard.querySelector('.place__number');
  const likeButton = placeCard.querySelector('.place__button');

  placeCard.querySelector('.place__title').textContent = placeName;
  photoCard.src = placeLink;
  photoCard.alt = placeName;

  likeNumber.textContent = likes;

  if (cardOwnerID !== userID ) {
    deleteBtn.style.display = 'none';
  }

  cardLikes.forEach(like => {
    if (like._id == userID) {
      likeButton.classList.add('place__button_active');
    }
  });

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

  likeButton.addEventListener('click', (e) => {
    e.target.classList.toggle('place__button_active');
  })

placeCard.querySelector('.place__delete').addEventListener('click', (e) => {
    e.target.closest('.place').remove();
  })
  
  return placeCard;
}

export function addInitialCards (placeName, placeLink, userID, cardOwnerID, cardID, likes, cardLikes) {
  const initialPlaceCards = createCard(placeName, placeLink, userID, cardOwnerID, cardID, likes, cardLikes);
  places.append(initialPlaceCards);
}