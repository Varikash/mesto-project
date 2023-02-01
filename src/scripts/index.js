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
  config
} from "../utils/constants.js";

import { closePopup, openPopup } from './modal';
import { enableValidation } from "./validate.js";
import { addInitialCards, createCard } from "./cards.js"
import { disableButton } from "../utils/utils.js"
import Api from "../components/Api.js"

const api = new Api(config);

//открываем модальное окно профиля
profileButton?.addEventListener('click', () => {
  openPopup(popupProfile);
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
      closePopup(popupProfile);
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
  openPopup(popupAvatar);
})

//функция смены аватарки
formAvatar?.addEventListener('submit', (evt) => {
  evt.preventDefault();
  avatarFormButton.textContent = 'Сохранение...'
  api.refreshAvatar(avatarInput.value)
  .then(data => {
    profPicture.src = data.avatar;
    formAvatar.reset();
    closePopup(popupAvatar);
    disableButton(avatarFormButton);
  })
  .catch(err => console.log(err))
  .finally(() => {
    avatarFormButton.textContent = 'Сохранить';
  })
})


// Функция открытия модального окна загрузки новой карточки
placeButton?.addEventListener('click', () => {
  openPopup(popupPlaces);
});

// добавляем новую карточку
popupPlaces.addEventListener('submit', (e) => {
  e.preventDefault();
    placeFormButton.textContent = 'Сохранение...'
    api.pushCard(popupPlaceName.value, popupPlaceLink.value)
    .then(data => {
      places.prepend(createCard(data, data.owner, cardActions));
      closePopup(popupPlaces);
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