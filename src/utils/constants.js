const avatar = document.querySelector('.profile__avatar');
const avatarEditor = document.querySelector('.profile__avatar-overlay');
const avatarPen = document.querySelector('.profile__avatar-button'); //кнопка вызова модального окна для смены аватарки
const popupAvatar = document.querySelector('#avatar-edit'); //модальное окно смены аватарки
const formPlace = document.forms.places;
const formAvatar = document.forms.avatar; //форма отправки данных для загрузки новой аватарки
const avatarInput = formAvatar.elements.avatarLink; //input ввода ссылки для загрузки новой аватарки
const profPicture = document.querySelector('.profile__picture'); //аватарка профиля
const popupPlaces = document.querySelector('#new-place');//Модальное окно добавления нового места
const placeButton = document.querySelector('.profile__add-button'); //кнопка открытия модального окна
const popupPlaceName = popupPlaces.querySelector('.popup__input[name = "place-name"]');
const popupPlaceLink = popupPlaces.querySelector('.popup__input[name = "place-link"]');
const profileButton = document.querySelector('.profile__title-setting'); //Кнопка редактирования профиля
const popupProfile = document.querySelector('#profile'); //Модальное окно редактирования профиля
const popupInputName = popupProfile.querySelector('.popup__input[name="profile-name"]'); //Инпут имени в модальном окне
const popupInputTitle = popupProfile.querySelector('.popup__input[name="profile-title"]'); //Инпут титула в модальном окне
const profileName = document.querySelector('.profile__title'); //Имя профиля на странице
const profileTitle = document.querySelector('.profile__subtitle'); //Титул профиля на странице
const closeButtons = document.querySelectorAll('.popup__close-button')
const popups = Array.from(document.querySelectorAll('.popup'));
const photoContainer = document.querySelector('.popup__photo-container');
const profileFormButton = document.querySelector('#profileFormButton');
const placeFormButton = document.querySelector('#placeFormButton');
const avatarFormButton = document.querySelector('#avatarFormButton');
//для модуля cards
const photoView = document.querySelector('#photo-view'); //модальное окно, при нажатии на изображение
const photo = document.querySelector('.photo');
const photoTitle = document.querySelector('.photo-title');

//index, cards
const places = document.querySelector('.places__cards-grid');
const cardTemplate = document.querySelector('#place-card').content;

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-17/',
  headers: {
    authorization: '4473f1fa-06d0-4bf8-9c17-4612fabec6aa',
    'Content-Type': 'application/json'
  }
}

const settings = {
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  inactiveButtonClass: 'popup__button_inactive',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
};

export {
  popups,
  closeButtons,
  profileButton, 
  popupProfile, 
  popupInputName, 
  popupInputTitle, 
  profileName,
  profileTitle,
  avatar,
  avatarEditor,
  avatarPen,
  popupAvatar,
  formPlace,
  formAvatar,
  avatarInput,
  profPicture,
  photoView,
  photo,
  photoTitle,
  photoContainer,
  popupPlaces,
  placeButton,
  popupPlaceName,
  popupPlaceLink,
  places,
  cardTemplate,
  profileFormButton,
  placeFormButton,
  avatarFormButton,
  config,
  settings,
}