let currentPopup = null;
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  currentPopup = popup;
  popup.addEventListener('click', clickHandler);
  window.addEventListener('keydown', keyHandler);
  return currentPopup;
}

function clickHandler(evt) {
  if (evt.target === currentPopup) {
    closeModal(currentPopup);
  }
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', clickHandler);
  window.removeEventListener('keydown', keyHandler);
}

function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closeModal(currentPopup);
  }
}
export { openModal, closeModal };
