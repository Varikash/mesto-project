let profileButton = document.querySelector('.profile__title-setting');


let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');
let popupSaveButton = popup.querySelector('.popup__button');

profileButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
})

popupCloseButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
})

popupSaveButton.addEventListener('click', function () {
  alert('событие');
})