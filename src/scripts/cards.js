import { photoView, photo, photoTitle, places } from "./utils.js";
import { openPopup } from "./modal.js";


const cardTemplate = document.querySelector('#place-card').content;

/**
 * Функция добавления дефолтных карточек + удаление и лайки
 */
export function createCard(placeName, placeLink, userID, cardOwnerID, cardID, likes, cardLikes, deleteCardFunction, deleteLikeFunction, putLikeFunction) {
  const placeCard = cardTemplate.querySelector('.place').cloneNode(true);
  const photoCard = placeCard.querySelector('.place__image');
  const deleteBtn = placeCard.querySelector('.place__delete');
  const likeNumber = placeCard.querySelector('.place__number');
  const likeButton = placeCard.querySelector('.place__button');
  const placeTitle = placeCard.querySelector('.place__title');

  placeTitle.textContent = placeName;
  photoCard.src = placeLink;
  photoCard.alt = placeName;
  
  likeNumber.textContent = likes;

  if (cardOwnerID !== userID ) {
    deleteBtn.classList.add('place__delete_disable');
  }

  if (cardLikes) {
    cardLikes.forEach(like => {
      if (like._id == userID) {
        likeButton.classList.add('place__button_active');
      }
    })
  } else {
    likeNumber.textContent = 0;
  }
  

  photoCard.addEventListener('click', () => {
    openPopup(photoView);
    photo.src = placeLink;
    photo.alt = placeName;
    photoTitle.textContent = placeName;
  })
  
  deleteBtn.addEventListener('click', (e) => {
    try {
      deleteCardFunction(cardID)
    } catch (err) {
      console.log(`Ошибка удаления карточки в модуле cards: ${err}`)
    }
    
  });

  likeButton.addEventListener('click', (e) => {
    if (e.target.classList.contains('place__button_active')) {
      try {
        deleteLikeFunction(cardID)
      } catch (err) {
        console.log(`Ошибка удаления лайка в модуле cards: ${err}`)
      }
    } else {
      try {
        putLikeFunction(cardID)
      } catch (err) {
        console.log(`Ошибка постановки лайка в модуле cards: ${err}`)
      }
    }
  })
    return placeCard;
}

export function addInitialCards (placeName, placeLink, userID, cardOwnerID, cardID, likes, cardLikes) {
  const initialPlaceCards = createCard(placeName, placeLink, userID, cardOwnerID, cardID, likes, cardLikes);
  places.append(initialPlaceCards);
}