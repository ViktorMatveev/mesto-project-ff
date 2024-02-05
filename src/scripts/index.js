/** done! @todo: Открытие и закрытие модальных окон
 * @todo: Закрытие попапа кликом на оверлэй и Esc
 * @todo: Редактирование информации о себе
 * @todo: Форма добавления карточки
 * @todo: Добавление новой карточки
 * done! @todo: Лайк карточки
 * done! @todo: Открытие попапа с картинкой
 * done! @todo: Плавное открытие и закрытие попапов
 * **/

import '../pages/index.css';
import { initialCards } from './cards';
import { openModal, closeModal } from './modal';

// -buttons-

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// -popups-
const popups = Array.from(document.querySelectorAll('.popup'));
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
// const scaledImg = popupImage.querySelector('.popup__image');

const pageContent = document.querySelector('.page__content');
const places = document.querySelector('.places');
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

popups.forEach((popup) => popup.classList.add('popup_is-animated'));

function craeteCard(
  cardInfoName,
  cardInfoLink,
  toggleIsLiked,
  deleteCard,
  openImgPopup
) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = popupImage.querySelector('.popup__caption');
  cardElement.querySelector('.card__image').src = cardInfoLink;
  cardElement.querySelector('.card__image').alt = cardInfoName;
  cardElement.querySelector('.card__title').textContent = cardInfoName;

  // scaledImg.src = cardInfoLink;
  // scaledImg.alt = cardInfoName;
  // cardTitle.textContent = cardInfoName;

  cardElement.addEventListener('click', toggleIsLiked);

  cardElement.addEventListener('click', deleteCard);

  cardElement.addEventListener('click', openImgPopup);

  return cardElement;
}

function toggleIsLiked(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}

function deleteCard(evt) {
  if (evt.target.classList.contains('card__delete-button')) {
    evt.target.closest('.card').remove();
  }
}

function showCards(cards) {
  cards.forEach((card) => {
    const cardElement = craeteCard(
      card.name,
      card.link,
      toggleIsLiked,
      deleteCard,
      openImgPopup
    );
    placesList.append(cardElement);
  });
}

showCards(initialCards);

// -ВЫЗОВ И ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН-

editButton.addEventListener('click', () => openModal(popupProfileEdit));

addButton.addEventListener('click', () => openModal(popupNewCard));

pageContent.addEventListener('click', (evt) => {
  closeModal(evt);
});

function openImgPopup(evt) {
  if (evt.target.classList.contains('card__image')) {
    openModal(popupImage);
    const scaledImg = popupImage.querySelector('.popup__image');
    scaledImg.src = evt.target.src;
    scaledImg.alt = evt.target.alt;
    const cardTitle = popupImage.querySelector('.popup__caption');
    cardTitle.textContent = evt.target.alt;

    return scaledImg;
  }
}
