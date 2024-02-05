/**Работу модальных окон — в файл modal.js.
 * Оттуда экспортируйте функции openModal и closeModal,
 * принимающие в качестве аргумента DOM-элемент модального окна,
 * с которым нужно произвести действие. */
function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

function closeModal(evt) {
  if (evt.target.classList.contains('popup__close')) {
    evt.target.closest('.popup').classList.remove('popup_is-opened');
  }
}

export { openModal, closeModal };
