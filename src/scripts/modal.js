
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalOnEscape)
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeModalOnEscape)
}

function closeModalOnEscape (event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

export {
  openPopup, 
  closePopup,
  closeModalOnEscape
};