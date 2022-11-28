import '../pages/index.css'
import { openPopup, closePopup } from "./functions.js";
import { profileButton, popupProfile, popupInputName, popupInputTitle, profileName, profileTitle } from "./profileModal.js";
import { avatar, avatarEditor, avatarPen, popupAvatar, formAvatar, avatarInput, profPicture, sizeCheck } from "./avatarModal.js";
import { enableValidation } from "./validationFormFuncs.js";
import { popupPlaces, placeButton } from "./placesModal.js";
import { addInitialCards } from "./initialCardsLoad.js"
import { initialCards, profileInfo } from './api';
import { addNewCard } from "./addNewCard.js";



const closeButtons = document.querySelectorAll('.popup__close-button')
const popups = Array.from(document.querySelectorAll('.popup'));



//открываем модальное окно профиля
profileButton?.addEventListener('click', () => {
  openPopup(popupProfile);
  popupInputName.value = profileName.textContent;
  popupInputTitle.value = profileTitle.textContent;
})

// функция присвоения значений инпутов имени и титулу профиля на сайте.
popupProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (popupInputName.value.length > 0) {
    profileName.textContent = popupInputName.value;
  }

  if (popupInputTitle.value.length > 0) {
    profileTitle.textContent = popupInputTitle.value;
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

  if (avatarInput.value.length > 0) {
    profPicture.src = avatarInput.value;
  }
  formAvatar.reset();
  closePopup(popupAvatar);
})




// Функция открытия модального окна загрузки новой карточки
placeButton?.addEventListener('click', () => {
  openPopup(popupPlaces);
});

// добавляем новую карточку
popupPlaces.addEventListener('submit', addNewCard);



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

initialCards()
.then(objects => {
  objects.forEach((object) => {
    addInitialCards(object.name, object.link);
  });
})
.catch((err) => {
  console.log(err);
}); 


profileInfo()
.then(object => {
  profileName.textContent = object.name;
  profileTitle.textContent = object.about;
  profPicture.src = object.avatar;
  sizeCheck();
})
.catch((err) => {
  console.log(err);
}); 
