
//Кнопка редактирования профиля
const profileButton = document.querySelector('.profile__title-setting');
const profileName = document.querySelector('.profile__title'); //Имя профиля на странице
const profileTitle = document.querySelector('.profile__subtitle'); //Титул профиля на странице


//Модальное окно редактирования профиля
const popupProfile = document.querySelector('#profile');

//Кнопка закрытия модального окна профиля
const popupInputName = popupProfile.querySelector('.popup__input[name="profile-name"]'); //Инпут имени в модальном окне
const popupInputTitle = popupProfile.querySelector('.popup__input[name="profile-title"]'); //Инпут титула в модальном окне

//Модальное окно добавления нового места
const popupPlaces = document.querySelector('#new-place');
const placeButton = document.querySelector('.profile__add-button'); //кнопка открытия модального окна
const popupPlaceName = popupPlaces.querySelector('.popup__input[name="place-name"]');
const popupPlaceLink = popupPlaces.querySelector('.popup__input[name = "place-link"]');
const places = document.querySelector('.places__cards-grid');
const photoView = document.querySelector('#photo-view'); //модальное окно, при нажатии на изображение
const photoContainer = document.querySelector('.popup__photo-container');
const photo = document.querySelector('.photo');
const photoTitle = document.querySelector('.photo-title');
const closeButtons = document.querySelectorAll('.popup__close-button')
const formPlaceCards = document.querySelector('#place-cards');
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

/* Функция открытия модального окна */

placeButton?.addEventListener('click', () => {
    openPopup(popupPlaces);
  });

/* Функция закрытия модального окна */

/**
 * Дефолтный набор карточек
 */
const initialCards = [
  {
    name: 'Элиста, Калмыкия',
    link: './images/kalmikia.jpeg'
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
    name: 'Карачаевск',
    link: './images/karachaesk.jpeg'
  }
];

/**
 * добавляем новую карточку
 */
popupPlaces.addEventListener('submit', addNewCard);

window.addEventListener('keydown', (evt) => {
  if (popupPlaces.classList.contains('popup_opened') && evt.key === 'Escape') {
    closePopup(popupPlaces);
  }
});

/****************************ФУНКЦИИ*************************************/

/**
 * открытие popup
 */
function openPopup (popupElement) {
  popupElement.classList.add('popup_opened');
}

/**
 * закрытие popup
 */
function closePopup (popupElement) {
  popupElement.classList.remove('popup_opened');
}

closeButtons.forEach ((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup);
  })
})


/**
 * @param {Event} e;
 *
 * функция добавления новой карточки
 */
function addNewCard(e) {
  e.preventDefault(); 

  if (popupPlaceName.value.length > 0 && popupPlaceLink.value.length > 0) {
    places.prepend(createCard(popupPlaceName.value, popupPlaceLink.value));
  }

  formPlaceCards.reset(); 
  
  closePopup(popupPlaces);
}

/**
 * Функция добавления дефолтных карточек + удаление и лайки
 */
function createCard(placeName, placeLink) {
  const cardTemplate = document.querySelector('#place-card').content;
  const placeCard = cardTemplate.querySelector('.place').cloneNode(true);
  const photoCard = placeCard.querySelector('.place__image');

  placeCard.querySelector('.place__title').textContent = placeName;
  photoCard.src = placeLink;
  photoCard.alt = placeName;

  photoCard.addEventListener('click', () => {
    openPopup(photoView);
    photo.src = placeLink;
    photo.alt = placeName;
    photoTitle.textContent = placeName;
  })

  placeCard.querySelector('.place__button').addEventListener('click', (e) => {
      e.target.classList.toggle('place__button_active');
    })

  placeCard.querySelector('.place__delete').addEventListener('click', (e) => {
      e.target.closest('.place').remove();
    })

  return placeCard;

}

function addInitialCards (placeName, placeLink) {
  const initialPlaceCards = createCard(placeName, placeLink);
  places.prepend(initialPlaceCards);
}

initialCards.forEach((initialCard) => {
  addInitialCards(initialCard.name, initialCard.link);
});
