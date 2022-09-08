let profileButton = document.querySelector('.profile__title-setting');


let profileName = document.querySelector('.profile__title');
let profileTitle = document.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');
let popupSaveButton = popup.querySelector('.popup__button');
let popupInputName = popup.querySelector('.popup__input[name="profile-name"]');
let popupInputTitle = popup.querySelector('.popup__input[name="profile-title"]');

profileButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
})

popupCloseButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
})

popupSaveButton.addEventListener('click', function () {
  if (popupInputName.value.length > 0) {
    profileName.textContent = popupInputName.value;
  }

  if (popupInputTitle.value.length > 0) {
    profileTitle.textContent = popupInputTitle.value;
  }
})

