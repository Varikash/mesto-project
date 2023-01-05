import { openPopup, photoView, photo, photoTitle, places } from "./modal.js";
import { deleteCard, putLike, deleteLike } from "./api.js";


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
  
  let digit = likes;

  likeNumber.textContent = digit;

  if (cardOwnerID !== userID ) {
    deleteBtn.style.display = 'none';
  }

  if (cardLikes) {
    cardLikes.forEach(like => {
      if (like._id == userID) {
        likeButton.classList.add('place__button_active');
      }
    })
  } else {
    likeNumber.textContent = 0;
    digit = 0;
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

  likeButton.addEventListener('click', (e) => {
    if (e.target.classList.contains('place__button_active')) {
      deleteLike(cardID);
      likeNumber.textContent = digit - 1;
      digit = digit - 1;
    } else {
      putLike(cardID);
      likeNumber.textContent = digit + 1;
      digit = digit + 1;
    }
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