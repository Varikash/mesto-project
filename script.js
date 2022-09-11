//Открытие-закрытие модального окна + редактирование имени

const profileButton = document.querySelector('.profile__title-setting'); //кнопка редактирования профиля (открытие)

const profileName = document.querySelector('.profile__title'); //Имя профиля на странице
const profileTitle = document.querySelector('.profile__subtitle'); //Титул профиля на странице

const popupProfile = document.querySelector('#profile'); //модальное окно
const popupCloseButtonFirst = popupProfile.querySelector('#closeBtn-1'); //кнопка закрытия модального окна
const popupSaveButton = popupProfile.querySelector('.popup__button'); //кнопка сохранения
const popupInputName = popupProfile.querySelector('.popup__input[name="profile-name"]'); //Инпут имени в модальном окне
const popupInputTitle = popupProfile.querySelector('.popup__input[name="profile-title"]'); //Импут титула в модальном окне

//функция открытия модального окна

profileButton.addEventListener('click', function () {
  popupProfile.classList.add('popup_opened');
})

//функция закрытия модального окна

popupCloseButtonFirst.addEventListener('click', function () {
  popupProfile.classList.remove('popup_opened');
})

// функция присвоения значений инпутов имени и титулу профиля на сайте.

popupSaveButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (popupInputName.value.length > 0) {
    profileName.textContent = popupInputName.value;
  }
  if (popupInputTitle.value.length > 0) {
    profileTitle.textContent = popupInputTitle.value;
  }
})
//----------------------------------------------------------------------------------------

//Открытие-закрытие модального окна для добавления нового места

const popupPlaces = document.querySelector('#new-place'); //модальное окно для добавления места
const placeButton = document.querySelector('.profile__add-button'); //кнопка открытия модального окна
const popupCloseButtonSecond = popupPlaces.querySelector('#closeBtn-2'); //кнопка закрытия модального окна

/* Функция открытия модального окна */

placeButton.addEventListener('click', function () {
  popupPlaces.classList.add('popup_opened');
})

/* Функция закрытия модального окна */

popupCloseButtonSecond.addEventListener('click', function () {
  popupPlaces.classList.remove('popup_opened');
})

/*---------------------------------------------------------------------------------------*/

/* Функция лайк */

const likeButtons = document.querySelectorAll('.place__button');

likeButtons.forEach(likeButton => likeButton.addEventListener('click', function () {
  this.classList.toggle('place__button_active');
}))

/*---------------------------------------------------------------------------------------*/

//----/