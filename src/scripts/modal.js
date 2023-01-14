
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', function(event) {
    closeModalOnEscape(event, popupElement)
  })
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', function(event){
    closeModalOnEscape(event, popupElement)
  })
}

function closeModalOnEscape (event, popupElement) {
  if (event.key === 'Escape') {
    closePopup(popupElement);
  }
}

export {
  openPopup, 
  closePopup,
  closeModalOnEscape
};