const avatar = document.querySelector('.profile__avatar');
const avatarEditor = document.querySelector('.profile__avatar-overlay');
const avatarPen = document.querySelector('.profile__avatar-button'); //кнопка вызова модального окна для смены аватарки
const popupAvatar = document.querySelector('#avatar-edit'); //модальное окно смены аватарки
const formAvatar = document.forms.avatar; //форма отправки данных для загрузки новой аватарки
const avatarInput = formAvatar.elements.avatarLink; //input ввода ссылки для загрузки новой аватарки
const profPicture = document.querySelector('.profile__picture'); //аватарка профиля


function sizeCheck () {
  if (profPicture.naturalWidth > profPicture.naturalHeight) {
    profPicture.style.width='auto';
    profPicture.style.height='100%';
  } else {
    profPicture.style.width='100%';
    profPicture.style.height='auto';
  }
}

export {
  avatar,
  avatarEditor,
  avatarPen,
  popupAvatar,
  formAvatar,
  avatarInput,
  profPicture,
  sizeCheck
}