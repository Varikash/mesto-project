import { openPopup, photoView, photo, photoTitle, places } from "./modal.js";
import { deleteCard, putLike, deleteLike } from "./api.js";

const cardTemplate = document.querySelector('#place-card').content;

/**
 * Функция добавления дефолтных карточек + удаление и лайки
 */
export function createCard(placeName, placeLink, userID, cardOwnerID, cardID, likes, cardLikes) {
  const placeCard = cardTemplate.querySelector('.place').cloneNode(true);
  const photoCard = placeCard.querySelector('.place__image');
  const deleteBtn = placeCard.querySelector('.place__delete');
  const likeNumber = placeCard.querySelector('.place__number');
  const likeButton = placeCard.querySelector('.place__button');
  const placeTitle = placeCard.querySelector('.place__title');

  placeTitle.textContent = placeName;
  photoCard.src = placeLink;
  photoCard.alt = placeName;
  
  let digit = likes;

  likeNumber.textContent = digit;

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
    digit = 0;
  }
  

  photoCard.addEventListener('click', () => {
    openPopup(photoView);
    photo.src = placeLink;
    photo.alt = placeName;
    photoTitle.textContent = placeName;
  })
  
  deleteBtn.addEventListener('click', async (e) => {
    try {
      await deleteCard(cardID);
      e.target.closest('.place').remove();
    } catch (err) {
      console.log(`Некорректно работает функция удаления карточки в модуле cards. Ошибка: ${err}`);
    }
  });

  likeButton.addEventListener('click', async (e) => {
    if (e.target.classList.contains('place__button_active')) {
      try {
        await deleteLike(cardID);
        likeNumber.textContent = digit - 1;
        digit = digit - 1;
      } catch (err) {
        console.log(`Некорректно работает функция лайка карточки в модуле cards. Ошибка: ${err}`)
      }
    } else {
      try {
        await putLike(cardID);
        likeNumber.textContent = digit + 1;
        digit = digit + 1;
      } catch (err) {
        console.log(`Некорректно работает функция лайка карточки в модуле cards. Ошибка: ${err}`)
      }
    }
    e.target.classList.toggle('place__button_active');
  })
  
  return placeCard;
}

export function addInitialCards (placeName, placeLink, userID, cardOwnerID, cardID, likes, cardLikes) {
  const initialPlaceCards = createCard(placeName, placeLink, userID, cardOwnerID, cardID, likes, cardLikes);
  places.append(initialPlaceCards);
}