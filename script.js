//Открытие-закрытие модального окна + редактирование имени

let profileButton = document.querySelector('.profile__title-setting'); //кнопка редактирования профиля (открытие)

let profileName = document.querySelector('.profile__title'); //Имя профиля на странице
let profileTitle = document.querySelector('.profile__subtitle'); //Титул профиля на странице

let popup = document.querySelector('.popup'); //модальное окно
let popupCloseButton = popup.querySelector('.popup__close-button'); //кнопка закрытия модального окна
let popupSaveButton = popup.querySelector('.popup__button'); //кнопка сохранения
let popupInputName = popup.querySelector('.popup__input[name="profile-name"]'); //Инпут имени в модальном окне
let popupInputTitle = popup.querySelector('.popup__input[name="profile-title"]'); //Импут титула в модальном окне
const places = document.querySelector('.places__cards-grid');

//функция открытия модального окна

profileButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
})

//функция закрытия модального окна

popupCloseButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
})

// функция присвоения значений инпутов имени и титулу профиля на сайте.

popup.addEventListener('submit', function (e) {
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

const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/karachaesk.jpeg',
  },
  {
    name: 'Алтай',
    link: './images/altai.jpeg'
  },
  {
    name: 'Чиркейская ГЭС',
    link: './images/dagestan.jpeg'
  },
  {
    name: 'Домбай',
    link: './images/dombai.jpg'
  },
  {
    name: 'Эльбрус',
    link: './images/elbrus.jpg'
  },
  {
    name: 'Элиста, Калмыкия',
    link: './images/kalmikia.jpeg'
  }
];


function initialCardsAdd(placeName, placeLink) {
  const cardTemplate = document.querySelector('#place-card').content;
  console.log(cardTemplate.querySelector('.place'));
  const placeCard = cardTemplate.querySelector('.place').cloneNode(true);

  placeCard.querySelector('.place__image').src = placeLink;
  placeCard.querySelector('.place__title').textContent = placeName;

  places.append(placeCard);
}

for (let i = 0; i < initialCards.length; i++) {
  initialCardsAdd(initialCards[i].name, initialCards[i].link);
}

/* Функция удаления карточки*/



/* Функция лайк */

// const likeButtons = document.querySelectorAll('.place__button');

// likeButtons.forEach(likeButton => likeButton.addEventListener('click', function () {
//   this.classList.toggle('place__button_active');
// }))

/*---------------------------------------------------------------------------------------*/


