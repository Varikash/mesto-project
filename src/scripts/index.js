import '../pages/index.css'
import { 
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
  formPlace,
  profileFormButton,
  placeFormButton,
  avatarFormButton,
  photoView,
  config,
  settings
} from "../utils/constants.js";

import { addInitialCards, createCard } from "./cards.js"
import { disableButton } from "../utils/utils.js"
import Api from "../components/Api.js"
import FormValidator from '../components/FormValidator.js'
import Popup from '../components/Popup.js'

const api = new Api(config);
const profileForm = new FormValidator(settings, document.querySelector('#profile-form'));
const placeCardForm = new FormValidator(settings, document.querySelector('#place-cards'));
const avatarForm = new FormValidator(settings, document.querySelector('#avatar-input'));
const profilePopup = new Popup(popupProfile);
const newPlacePopup = new Popup(popupPlaces);
const photoViewPopup = new Popup(photoView);
const avatarPopup = new Popup(popupAvatar);


profileForm.enableValidation();
placeCardForm.enableValidation();
avatarForm.enableValidation();
profilePopup.setEventListeners();
newPlacePopup.setEventListeners();
photoViewPopup.setEventListeners();
avatarPopup.setEventListeners();

//открываем модальное окно профиля
profileButton?.addEventListener('click', () => {
  profilePopup.open();
  popupInputName.value = profileName.textContent;
  popupInputTitle.value = profileTitle.textContent;
})

// функция присвоения значений инпутов имени и титулу профиля на сайте.
popupProfile?.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileFormButton.textContent = 'Сохранение...'
    api.refreshProfileInfo(popupInputName.value, popupInputTitle.value)
    .then(data => {
      profileName.textContent = data.name;
      profileTitle.textContent = data.about;
      profilePopup.close();
    })
    .catch (err => {
      console.log(err);
    })
    .finally(() => {
      profileFormButton.textContent = 'Сохранить'
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
  avatarPopup.open();
})

//функция смены аватарки
formAvatar?.addEventListener('submit', (evt) => {
  evt.preventDefault();
  avatarFormButton.textContent = 'Сохранение...'
  api.refreshAvatar(avatarInput.value)
  .then(data => {
    profPicture.src = data.avatar;
    formAvatar.reset();
    avatarPopup.close();
    disableButton(avatarFormButton);
  })
  .catch(err => console.log(err))
  .finally(() => {
    avatarFormButton.textContent = 'Сохранить';
  })
})


// Функция открытия модального окна загрузки новой карточки
placeButton?.addEventListener('click', () => {
  newPlacePopup.open();
});

// добавляем новую карточку
popupPlaces.addEventListener('submit', (e) => {
  e.preventDefault();
    placeFormButton.textContent = 'Сохранение...'
    api.pushCard(popupPlaceName.value, popupPlaceLink.value)
    .then(data => {
      places.prepend(createCard(data, data.owner, cardActions));
      newPlacePopup.close()
      formPlace.reset();
      disableButton(placeFormButton);
    })
    .catch(err => {
      console.error(`Error creating new card in index module: ${err}`);
    })
    .finally(() => {
      placeFormButton.textContent = 'Создать';
    })
});

// //закрытие модального окна при нажатии не область вне модального окна
// popups.forEach(element => {
//   element.addEventListener('mousedown', (evt) => {
//     if (evt.target.classList.contains('popup')) {
//       closePopup(element);
//     }
//   })
// })

// //закрытие модальных окон на крестик
// closeButtons.forEach((button) => {
//   const popup = button.closest('.popup');
//   button.addEventListener('click', () => {
//     closePopup(popup);
//   })
// })

Promise.all([api.getInitialCards(), api.getProfileInfo()])
.then(([cards, user]) => {
  const userID = user._id;
  cards.forEach(card => {
    addInitialCards(card, user, cardActions);
  })
  profileName.textContent = user.name;
  profileTitle.textContent = user.about;
  profPicture.src = user.avatar;
})
.catch(err => {
  console.log(`Ошибка: ${err}`)
})

const cardActions = {
  deleteCardFunction: function (e, cardID) {
    api.deleteCard(cardID)
      .then(() => {
        e.target.closest('.place').remove()
      })
      .catch (err => {
        console.log(`Ошибка удаления карточки в модуле index: ${err}`)
      })
  },
  deleteLikeFunction: function (e, cardID, likeNumber) {
    api.deleteLike(cardID)
      .then((data) => {
        likeNumber.textContent = data.likes.length
        e.target.classList.toggle('place__button_active');
      })
      .catch(err => {
        console.log(`Ошибка с удалением лайка в модуле index: ${err}`)
      })
  },
  putLikeFunction: function (e, cardID, likeNumber) {
    api.putLike(cardID)
      .then((data) => {
        likeNumber.textContent = data.likes.length;
        e.target.classList.toggle('place__button_active');
      })
      .catch(err => {
        console.log(`Ошибка с постановкой лайка в модуле index: ${err}`)
      })
  }
}