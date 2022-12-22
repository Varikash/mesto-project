import '../pages/index.css'
import { openPopup, closePopup } from "./utils.js";
import { profileButton, popupProfile, popupInputName, popupInputTitle, profileName, profileTitle } from "./profileModal.js";
import { avatar, avatarEditor, avatarPen, popupAvatar, formAvatar, avatarInput, profPicture } from "./avatarModal.js";
import { enableValidation } from "./validate.js";
import { popupPlaces, placeButton, popupPlaceName, popupPlaceLink } from "./placesModal.js";
import { addInitialCards } from "./cards.js"
import { initialCards, profileInfo, refreshProfInfo, refreshAvatar, pushCard } from './api';


const closeButtons = document.querySelectorAll('.popup__close-button')
const popups = Array.from(document.querySelectorAll('.popup'));


//открываем модальное окно профиля
profileButton?.addEventListener('click', () => {
  openPopup(popupProfile);
  popupInputName.value = profileName.textContent;
  popupInputTitle.value = profileTitle.textContent;
})

// функция присвоения значений инпутов имени и титулу профиля на сайте.
popupProfile?.addEventListener('submit', (evt) => {
  evt.preventDefault();

  try {
    refreshProfInfo(popupInputName.value, popupInputTitle.value);
  } catch (error) {
    console.log(`Ошибка: ${error}`);
  }

  closePopup(popupProfile);
})


//появление кнопки редактирования аватарки
avatar.addEventListener('mouseover', () => {
  avatarEditor.style.setProperty('visibility', 'visible');
  avatarEditor.style.setProperty('opacity', 1);
})

//скрытие кнопки редактировния аватарки
avatar.addEventListener('mouseout', () => {
  avatarEditor.style.setProperty('visibility', 'hidden');
  avatarEditor.style.setProperty('opacity', 0);
})

//открываем модальное окно загрузки аватарки
avatarPen?.addEventListener('click', () => {
  openPopup(popupAvatar);
})

//функция смены аватарки
formAvatar?.addEventListener('submit', (evt) => {
  evt.preventDefault();

  try {
    refreshAvatar(avatarInput.value);
  } catch (error) {
    console.log(`Ошибка: ${error}`);
  }

  formAvatar.reset();
  closePopup(popupAvatar);
})


// Функция открытия модального окна загрузки новой карточки
placeButton?.addEventListener('click', () => {
  openPopup(popupPlaces);
});

// добавляем новую карточку
popupPlaces.addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    pushCard(popupPlaceName.value, popupPlaceLink.value);
  } catch (error) {
    alert(error);
  }
  
  closePopup(popupPlaces);
});



// закрытие модальных окон по нажатию на esc
window.addEventListener('keydown', (evt) => {
  popups.forEach(element => {
    if (element.classList.contains('popup_opened') && evt.key === 'Escape') {
      closePopup(element);
    }
  })
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

enableValidation();


Promise.all([initialCards(), profileInfo()])
.then(([cards, user]) => {
  const userID = user._id;
  cards.forEach(card => {
    console.log(card.likes.length);
    addInitialCards(card.name, card.link, userID, card.owner._id, card._id);
  })
})
.catch(err => {
  console.log(`Ошибка: ${err}`)
})



profileInfo()
.then(object => {
  profileName.textContent = object.name;
  profileTitle.textContent = object.about;
  profPicture.src = object.avatar;
})
.catch((err) => {
  console.log(err);
}); 
