//Открытие-закрытие модального окна + редактирование имени

let profileButton = document.querySelector('.profile__title-setting'); //кнопка редактирования профиля (открытие)

let profileName = document.querySelector('.profile__title'); //Имя профиля на странице
let profileTitle = document.querySelector('.profile__subtitle'); //Титул профиля на странице

let popup = document.querySelector('.popup'); //модальное окно
let popupCloseButton = popup.querySelector('.popup__close-button'); //кнопка закрытия модального окна
let popupSaveButton = popup.querySelector('.popup__button'); //кнопка сохранения
let popupInputName = popup.querySelector('.popup__input[name="profile-name"]'); //Инпут имени в модальном окне
let popupInputTitle = popup.querySelector('.popup__input[name="profile-title"]'); //Импут титула в модальном окне

//функция открытия модального окна

profileButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
})

//функция закрытия модального окна

popupCloseButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
})

// функция присвоения значений инпутов имени и титулу профиля на сайте.

popupSaveButton.addEventListener('click', function (e) {
  e.preventDefault();

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


