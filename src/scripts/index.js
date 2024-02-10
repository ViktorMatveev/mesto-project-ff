import '../pages/index.css';

import {
  placesList,
  craeteCard,
  toggleIsLiked,
  deleteCard,
} from './conmponents/card';

import { openModal, closeModal } from './conmponents/modal';

import { initialCards } from './conmponents/cards';

// -buttons-

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = Array.from(document.querySelectorAll('.popup__close'));

// -popups-

const popups = Array.from(document.querySelectorAll('.popup'));
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

popups.forEach((popup) => popup.classList.add('popup_is-animated'));

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

// --вызов и зарытие модальных окон--
editButton.addEventListener('click', () => {
  openModal(popupProfileEdit);
  name.value = profileName.textContent;
  job.value = profileJob.textContent;
});

addButton.addEventListener('click', function () {
  openModal(popupNewCard), formNewPlace.reset();
});

closeButtons.forEach((button) =>
  button.addEventListener('click', function () {
    closeModal(button.closest('.popup'));
  })
);

function openImgPopup(evt) {
  if (evt.target.classList.contains('card__image')) {
    openModal(popupImage);
    const scaledImg = popupImage.querySelector('.popup__image');
    scaledImg.src = evt.target.src;
    scaledImg.alt = evt.target.alt;
    const cardTitle = popupImage.querySelector('.popup__caption');
    cardTitle.textContent = evt.target.alt;
  }
}

// --Работа с формами--

const formEdit = document.forms['edit-profile'];
const name = formEdit.name;
const job = formEdit.description;

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = name.value;
  profileJob.textContent = job.value;
  closeModal(popupProfileEdit);
}
formEdit.addEventListener('submit', handleFormEditSubmit);

const formNewPlace = document.forms['new-place'];
const namePlace = formNewPlace['place-name'];
const linkPlace = formNewPlace['link'];

function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();
  const newCard = craeteCard(
    namePlace.value,
    linkPlace.value,
    toggleIsLiked,
    deleteCard
  );
  placesList.prepend(newCard);
  closeModal(popupNewCard);
}
formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);
