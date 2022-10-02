/**
 * Кнопка редактирования профиля
 */
const profileButton = document.querySelector('.profile__title-setting');

const profileName = document.querySelector('.profile__title'); //Имя профиля на странице
const profileTitle = document.querySelector('.profile__subtitle'); //Титул профиля на странице

/**
 * Модальное окно редактирования профиля
 */
const popup = document.querySelector('.popup');

/**
 * 
 * Кнопка закрытия модального окна профиля
 */
const popupCloseButton = document.querySelector('.popup__close-button'); //кнопка закрытия модального окна
const popupSaveButton = popup.querySelector('.popup__button'); //кнопка сохранения
const popupInputName = popup.querySelector('.popup__input[name="profile-name"]'); //Инпут имени в модальном окне
const popupInputTitle = popup.querySelector('.popup__input[name="profile-title"]'); //Инпут титула в модальном окне

/**
 * Модальное окно добавления нового места
 */
const popupPlaces = document.querySelector('#new-place');
const placeButton = document.querySelector('.profile__add-button'); //кнопка открытия модального окна
const popupCloseButtonSecond = popupPlaces.querySelector('#closeBtn-2'); //кнопка закрытия модального окна
const popupPlaceName = popupPlaces.querySelector('.popup__input[name="place-name"]');
const popupPlaceLink = popupPlaces.querySelector('.popup__input[name = "place-link"]');
const places = document.querySelector('.places__cards-grid');
const photoView = document.querySelector('#photo-view'); //модальное окно, при нажатии на изображение
const popupCloseButtonThird = document.querySelector('#closeBtn-3'); //кнопка закрытия модального окна изображения
const photoContainer = document.querySelector('.popup__photo-container');

//открываем модальное окно профиля

profileButton?.addEventListener('click', () => {
    openPopup(popup);
  })

//Закрываем модальное окно профиля

popupCloseButton?.addEventListener('click', () => {
    closePopup(popup);
  });

// функция присвоения значений инпутов имени и титулу профиля на сайте.

popup.addEventListener('submit', (e) => {
    e.preventDefault();

    if (popupInputName.value.length > 0) {
      profileName.textContent = popupInputName.value;
    }

    if (popupInputTitle.value.length > 0) {
      profileTitle.textContent = popupInputTitle.value;
    }

    popupInputName.value = profileName.textContent;
    popupInputTitle.value = profileTitle.textContent;

    closePopup(popup);
  })

/* Функция открытия модального окна */

placeButton.addEventListener('click', () => {
    openPopup(popupPlaces);
  });

/* Функция закрытия модального окна */

popupCloseButtonSecond.addEventListener('click', () => {
    closePopup(popupPlaces);
    popupPlaceName.value = '';
    popupPlaceLink.value = '';
  })


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

/**
 * @param {Event} e;
 *
 * функция добавления новой карточки
 */
function addNewCard(e) {
  e.preventDefault();

  if (popupPlaceName.value.length > 0 && popupPlaceLink.value.length > 0) {
    initialCardsAdd(popupPlaceName.value, popupPlaceLink.value);
  } else {
    alert('Для добавления места необходимо заполнить все поля.')
    addNewCard();
  }

  popupPlaceName.value = '';
  popupPlaceLink.value = '';
  closePopup(popupPlaces);
}

/**
 * Функция добавления дефолтных карточек + удаление и лайки
 */
function initialCardsAdd(placeName, placeLink) {
  const cardTemplate = document.querySelector('#place-card').content;
  const placeCard = cardTemplate.querySelector('.place').cloneNode(true);
  const photoCard = placeCard.querySelector('.place__image');

  const popupTemplate = document.querySelector('#photo-popup').content
  const photo = popupTemplate.querySelector('.photo').cloneNode(true);
  const photoTitle = popupTemplate.querySelector('.photo-title').cloneNode(true);

  photoCard.src = placeLink;

  photoCard.addEventListener('click', () => {
      openPopup(photoView);
      photo.src = placeLink;
      photoTitle.textContent = placeName;
      photoContainer.append(photo);
      photoContainer.append(photoTitle);

      popupCloseButtonThird.addEventListener('click', () => {
          closePopup(photoView);
          photo.remove();
          photoTitle.remove();
        });
    })

  placeCard.querySelector('.place__title').textContent = placeName;

  placeCard.querySelector('.place__button').addEventListener('click', (e) => {
      e.target.classList.toggle('place__button_active');
    })

  placeCard.querySelector('.place__delete').addEventListener('click', (e) => {
      e.target.closest('.place').remove();
    })

  places.prepend(placeCard);
}

initialCards.forEach((initialCard) => {
  initialCardsAdd(initialCard.name, initialCard.link);
})
