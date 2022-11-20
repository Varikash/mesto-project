
const avatar = document.querySelector('.profile__avatar');
const avatarEditor = document.querySelector('.profile__avatar-overlay');
const avatarPen = document.querySelector('.profile__avatar-button'); //кнопка вызова модального окна для смены аватарки
const popupAvatar = document.querySelector('#avatar-edit'); //модальное окно смены аватарки
const formAvatar = document.forms.avatar; //форма отправки данных для загрузки новой аватарки
const avatarInput = formAvatar.elements.avatarLink; //input ввода ссылки для загрузки новой аватарки
const profPicture = document.querySelector('.profile__picture'); //аватарка профиля

const profileButton = document.querySelector('.profile__title-setting'); //Кнопка редактирования профиля
const profileName = document.querySelector('.profile__title'); //Имя профиля на странице
const profileTitle = document.querySelector('.profile__subtitle'); //Титул профиля на странице

const popupProfile = document.querySelector('#profile'); //Модальное окно редактирования профиля

const popupInputName = popupProfile.querySelector('.popup__input[name="profile-name"]'); //Инпут имени в модальном окне
const popupInputTitle = popupProfile.querySelector('.popup__input[name="profile-title"]'); //Инпут титула в модальном окне

const popupPlaces = document.querySelector('#new-place');//Модальное окно добавления нового места
const placeButton = document.querySelector('.profile__add-button'); //кнопка открытия модального окна
const popupPlaceName = popupPlaces.querySelector('.popup__input[name = "place-name"]');
const popupPlaceLink = popupPlaces.querySelector('.popup__input[name = "place-link"]');
const places = document.querySelector('.places__cards-grid');
const photoView = document.querySelector('#photo-view'); //модальное окно, при нажатии на изображение
const photoContainer = document.querySelector('.popup__photo-container');
const photo = document.querySelector('.photo');
const photoTitle = document.querySelector('.photo-title');
const closeButtons = document.querySelectorAll('.popup__close-button')
const formPlaceCards = document.querySelector('#place-cards');
const popups = Array.from(document.querySelectorAll('.popup'));





//открываем модальное окно профиля
profileButton?.addEventListener('click', () => {
  openPopup(popupProfile);
  popupInputName.value = profileName.textContent;
  popupInputTitle.value = profileTitle.textContent;
})

avatarPen?.addEventListener('click', () => {
  openPopup(popupAvatar);
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

// Функция открытия модального окна 
placeButton?.addEventListener('click', () => {
  openPopup(popupPlaces);
});

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

// добавляем новую карточку
popupPlaces.addEventListener('submit', addNewCard);

// закрытие модальных окон по нажатию на esc
window.addEventListener('keydown', (evt) => {
  popups.forEach(element => {
    if (element.classList.contains('popup_opened') && evt.key === 'Escape') {
      closePopup(element);
    }
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

//появление кнопки редактирования аватарки
avatar.addEventListener('mouseover', () => {
  avatarEditor.style.setProperty('visibility', 'visible');
  avatarEditor.style.setProperty('opacity', 1);
})

//скрытие кнопки редактировния аватарки
avatar.addEventListener('mouseout', () => {
  avatarEditor.style.setProperty('visibility', 'hidden');
  avatarEditor.style.setProperty('opacity', 0);
})

//функция смены аватарки
formAvatar?.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (avatarInput.value.length > 0) {
    profPicture.src = avatarInput.value;
  }
  formAvatar.reset();
  closePopup(popupAvatar);
})

/*------------------------------------- Валидация формы ------------------------------------------*/


function showInputError(form, formInput, errorMessage) {
  const errorElement = form.querySelector(`.${formInput.id}-error`)
  formInput.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}

function hideInputError(form, formInput) {
  const errorElement = form.querySelector(`.${formInput.id}-error`)
  formInput.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

function isValid(form, formInput) {
  if (!formInput.validity.valid) {
    showInputError(form, formInput, formInput.validationMessage);
  } else {
    hideInputError(form, formInput);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_inactive');
  }
}

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const buttonElement = form.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(form, inputElement);
      toggleButtonState(inputList, buttonElement);
    })
  })
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach(form => {
    setEventListeners(form);
  })
}

enableValidation();


/****************************ФУНКЦИИ*************************************/

/**
 * открытие popup
 */
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

/**
 * закрытие popup
 */
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

closeButtons.forEach((button) => {
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

function addInitialCards(placeName, placeLink) {
  const initialPlaceCards = createCard(placeName, placeLink);
  places.prepend(initialPlaceCards);
}

initialCards.forEach((initialCard) => {
  addInitialCards(initialCard.name, initialCard.link);
});
