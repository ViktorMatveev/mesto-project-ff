function openModal(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', clickHandler);
  window.addEventListener('keydown', keyHandler);
}

function clickHandler(evt) {
  if (evt.target === document.querySelector('.popup_is-opened')) {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', clickHandler);
  window.removeEventListener('keydown', keyHandler);
}

function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}
export { openModal, closeModal };
