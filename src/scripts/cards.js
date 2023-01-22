import { photoView, photo, photoTitle, places } from "./utils.js";
import { openPopup } from "./modal.js";


const cardTemplate = document.querySelector('#place-card').content;

/**
 * Функция добавления дефолтных карточек + удаление и лайки
 */
export function createCard(card, user, cardActions) {
  const placeCard = cardTemplate.querySelector('.place').cloneNode(true);
  const photoCard = placeCard.querySelector('.place__image');
  const deleteBtn = placeCard.querySelector('.place__delete');
  const likeNumber = placeCard.querySelector('.place__number');
  const likeButton = placeCard.querySelector('.place__button');
  const placeTitle = placeCard.querySelector('.place__title');

  placeTitle.textContent = card.name;
  photoCard.src = card.link;
  photoCard.alt = card.name;
  
  likeNumber.textContent = card.likes.length;

  if (card.owner._id !== user._id ) {
    deleteBtn.classList.add('place__delete_disable');
  }

  if (card.likes) {
    card.likes.forEach(like => {
      if (like._id == user._id) {
        likeButton.classList.add('place__button_active');
      }
    })
  } else {
    likeNumber.textContent = 0;
  }
  

  photoCard.addEventListener('click', () => {
    openPopup(photoView);
    photo.src = card.link;
    photo.alt = card.name;
    photoTitle.textContent = card.name;
  })
  
  deleteBtn.addEventListener('click', (e) => {
    try {
      cardActions.deleteCardFunction(e, card._id)
    } catch (err) {
      console.log(`Ошибка удаления карточки в модуле cards: ${err}`)
    }
    
  });

  likeButton.addEventListener('click', (e) => {
    if (e.target.classList.contains('place__button_active')) {
      try {
        cardActions.deleteLikeFunction(e, card._id, likeNumber)
      } catch (err) {
        console.log(`Ошибка удаления лайка в модуле cards: ${err}`)
      }
    } else {
      try {
        cardActions.putLikeFunction(e, card._id, likeNumber)
      } catch (err) {
        console.log(`Ошибка постановки лайка в модуле cards: ${err}`)
      }
    }
  })
    return placeCard;
}

export function addInitialCards (card, user, cardActions) {
  const initialPlaceCards = createCard(card, user, cardActions);
  places.append(initialPlaceCards);
}