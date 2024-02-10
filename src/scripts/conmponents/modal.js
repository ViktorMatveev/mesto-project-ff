let currentPopup = null;
let currentForm = null;
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  currentPopup = popup;
  currentForm = popup.querySelector('.popup__form');

  const closePopButton = popup.querySelector('.popup__close');

  closePopButton.addEventListener('click', () => closeModal(popup));

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
  if (currentForm) {
    currentForm.reset();
  }
  currentForm = null;
  currentPopup = null;
  window.removeEventListener('keydown', keyHandler);
}

function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closeModal(currentPopup);
  }
}
export { openModal, closeModal };
