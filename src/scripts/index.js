import '../pages/index.css'
import { 
  avatar, 
  avatarEditor, 
  avatarPen, 
  popupAvatar, 
  profPicture, 
  popupPlaces, 
  placeButton,  
  places,
  cardTemplate, 
  profileButton, 
  popupProfile, 
  popupInputName, 
  popupInputTitle, 
  profileName, 
  profileTitle,
  profileFormButton,
  placeFormButton,
  avatarFormButton,
  photoView,
  config,
  settings
} from "../utils/constants.js";

import { disableButton } from "../utils/utils.js"
import Api from "../components/Api.js"
import FormValidator from '../components/FormValidator.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js'

/* -------------------------- ОБЪЯВЛЕНИЕ ЭКЗЕМПЛЯРОВ КЛАССОВ -------------------------- */

const api = new Api(config);
const profileForm = new FormValidator(settings, document.querySelector('#profile-form'));
const placeCardForm = new FormValidator(settings, document.querySelector('#place-cards'));
const avatarForm = new FormValidator(settings, document.querySelector('#avatar-input'));
const profilePopup = new PopupWithForm({
  popup: popupProfile,
  callback: (formData) => {
    profileFormButton.textContent = 'Сохранение...';
    api.refreshProfileInfo(formData)
    .then(data => {
      userInfo.setUserInfo(data);
      profilePopup.close();
    })
    .catch (err => {
      console.log(err.message);
    })
    .finally(() => {
      profileFormButton.textContent = 'Сохранить'
    }) 
  }
});
const avatarPopup = new PopupWithForm({
  popup: popupAvatar,
  callback: (formData) => {
    avatarFormButton.textContent = 'Сохранение...'
    api.refreshAvatar(formData)
  .then(data => {
    userInfo.setUserInfo(data);
    avatarPopup.close();
    disableButton(avatarFormButton);
  })
  .catch(err => console.log(err))
  .finally(() => {
    avatarFormButton.textContent = 'Сохранить';
  })
  }
});
const newPlacePopup = new PopupWithForm({
  popup: popupPlaces,
  callback: (formData) => {
    placeFormButton.textContent = 'Сохранение...'
    api.pushCard(formData)
    .then(data => {
      const card = addNewCard(data).generate();
      setSection().addItem(card);
      newPlacePopup.close();
      disableButton(placeFormButton);
    })
    .catch(err => {
      console.error(`Error creating new card in index module: ${err}`);
    })
    .finally(() => {
      placeFormButton.textContent = 'Создать';
    })
  }
});
const photoViewPopup = new PopupWithImage(photoView);
const userInfo = new UserInfo(profileName, profileTitle, profPicture);

const addNewCard = (card) => {
  return new Card(card, userInfo.userID, cardTemplate, {
    handleCardClick: () => {
      photoViewPopup.open(card.name, card.link)
  }}, cardActions)
}

const setSection = (cards) => {
  return new Section({
    items: cards,
    renderer: (card) => {
      const newItem = addNewCard(card).generate();
      return newItem;
    }
  }, places)
}

/* -------------------------- ИНИЦИИРОВАНИЕ МЕТОДОВ КЛАССОВ -------------------------- */

profileForm.enableValidation();
placeCardForm.enableValidation();
avatarForm.enableValidation();

profilePopup.setEventListeners();
newPlacePopup.setEventListeners();
photoViewPopup.setEventListeners();
avatarPopup.setEventListeners();

Promise.all([api.getInitialCards(), api.getProfileInfo()])
.then(([cards, user]) => {
  userInfo.setUserInfo(user);
  setSection(cards).renderItems();
})
.catch(err => {
  console.log(`Ошибка: ${err}`)
})

/* -------------------------- УСТАНОВКА СЛУШАТЕЛЕЙ СОБЫТИЙ -------------------------- */

//открываем модальное окно профиля
profileButton?.addEventListener('click', () => {
  profilePopup.open();
  const userData = userInfo.getUserInfo();
  popupInputName.value = userData.name;
  popupInputTitle.value = userData.about;
})

//появление кнопки редактирования аватарки
avatar?.addEventListener('mouseover', () => {
  avatarEditor.classList.add('profile__avatar-overlay_enable');
})

//скрытие кнопки редактировния аватарки
avatar?.addEventListener('mouseout', () => {
  avatarEditor.classList.remove('profile__avatar-overlay_enable');
})

//открываем модальное окно загрузки аватарки
avatarPen?.addEventListener('click', () => {
  avatarPopup.open();
})

// Функция открытия модального окна загрузки новой карточки
placeButton?.addEventListener('click', () => {
  newPlacePopup.open();
});

/* -------------------------- СЛОВАРИ -------------------------- */

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
  },
}