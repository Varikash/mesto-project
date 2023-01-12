import '../pages/index.css'
import { 
  openPopup, 
  closePopup, 
  avatar, 
  avatarEditor, 
  avatarPen, 
  popupAvatar, 
  formAvatar, 
  avatarInput, 
  profPicture, 
  popupPlaces, 
  placeButton, 
  popupPlaceName, 
  popupPlaceLink, 
  places, 
  profileButton, 
  popupProfile, 
  popupInputName, 
  popupInputTitle, 
  profileName, 
  profileTitle,
  popups,
  closeButtons, 
  formPlace
} from "./modal.js";

import { enableValidation } from "./validate.js";
import { addInitialCards, createCard } from "./cards.js"
import { initialCards, fetchProfileInfo, refreshProfInfo, refreshAvatar, pushCard } from './api';


//открываем модальное окно профиля
profileButton?.addEventListener('click', () => {
  openPopup(popupProfile);
  popupInputName.value = profileName.textContent;
  popupInputTitle.value = profileTitle.textContent;
})

// функция присвоения значений инпутов имени и титулу профиля на сайте.
popupProfile?.addEventListener('submit', (evt) => {
  evt.preventDefault();

    refreshProfInfo(popupInputName.value, popupInputTitle.value)
    .then(data => {
      profileName.textContent = data.name;
      profileTitle.textContent = data.about;
      closePopup(popupProfile);
    })
    .catch (err => {
      console.log(err);
    }) 
})


//появление кнопки редактирования аватарки
avatar.addEventListener('mouseover', () => {
  avatarEditor.classList.add('profile__avatar-overlay_enable');
})

//скрытие кнопки редактировния аватарки
avatar.addEventListener('mouseout', () => {
  avatarEditor.classList.remove('profile__avatar-overlay_enable');
})

//открываем модальное окно загрузки аватарки
avatarPen?.addEventListener('click', () => {
  openPopup(popupAvatar);
})

//функция смены аватарки
formAvatar?.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  refreshAvatar(avatarInput.value)
  .then(data => {
    profPicture.src = data.avatar;
    formAvatar.reset();
    closePopup(popupAvatar);
  })
  .catch(err => console.log(err));
})


// Функция открытия модального окна загрузки новой карточки
placeButton?.addEventListener('click', () => {
  openPopup(popupPlaces);
});

// добавляем новую карточку
popupPlaces.addEventListener('submit', (e) => {
  e.preventDefault();
    
    pushCard(popupPlaceName.value, popupPlaceLink.value)
    .then(data => {
      places.prepend(createCard(popupPlaceName.value, popupPlaceLink.value, data.owner._id, data.owner._id, data._id, data.likes.length, data.likes));
      closePopup(popupPlaces);
      formPlace.reset();
    })
    .catch(err => {
      console.error(`Error creating new card in index module: ${err}`);
    });
});

//закрытие модального окна при нажатии не область вне модального окна
popups.forEach(element => {
  element.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(element);
    }
  })
})

//закрытие модальных окон на крестик
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup);
  })
})

enableValidation({
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  inactiveButtonClass: 'popup__button_inactive',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  formSelector: '.popup__form',
});


Promise.all([initialCards(), fetchProfileInfo()])
.then(([cards, user]) => {
  const userID = user._id;
  cards.forEach(card => {
    addInitialCards(card.name, card.link, userID, card.owner._id, card._id, card.likes.length, card.likes);
  })
  profileName.textContent = user.name;
  profileTitle.textContent = user.about;
  profPicture.src = user.avatar;
})
.catch(err => {
  console.log(`Ошибка: ${err}`)
})
