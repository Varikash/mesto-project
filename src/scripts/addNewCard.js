import { createCard } from './initialCardsLoad.js';
import { popupPlaces, popupPlaceName, popupPlaceLink, places } from "./placesModal.js";
import { closePopup } from './functions.js';

const formPlaceCards = document.forms.places;

/**
 * @param {Event} e;
 *
 * функция добавления новой карточки
 */
export function addNewCard(e) {
  e.preventDefault();
  places.prepend(createCard(popupPlaceName.value, popupPlaceLink.value));
  formPlaceCards.reset();
  closePopup(popupPlaces);
}