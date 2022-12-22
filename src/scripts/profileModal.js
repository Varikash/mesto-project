//открытие модального окна редактирования профиля
const profileButton = document.querySelector('.profile__title-setting'); //Кнопка редактирования профиля
const popupProfile = document.querySelector('#profile'); //Модальное окно редактирования профиля
const popupInputName = popupProfile.querySelector('.popup__input[name="profile-name"]'); //Инпут имени в модальном окне
const popupInputTitle = popupProfile.querySelector('.popup__input[name="profile-title"]'); //Инпут титула в модальном окне
const profileName = document.querySelector('.profile__title'); //Имя профиля на странице
const profileTitle = document.querySelector('.profile__subtitle'); //Титул профиля на странице

export {
  profileButton, 
  popupProfile, 
  popupInputName, 
  popupInputTitle, 
  profileName,
  profileTitle
};