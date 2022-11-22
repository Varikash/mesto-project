import {createCard} from './initialCardsLoad.js';
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

  if (popupPlaceName.value.length > 0 && popupPlaceLink.value.length > 0) {
    places.prepend(createCard(popupPlaceName.value, popupPlaceLink.value));
  }

  formPlaceCards.reset();

  closePopup(popupPlaces);
}