import '../pages/index.css';

import {
  placesList,
  craeteCard,
  toggleIsLiked,
  deleteCard,
} from './conmponents/card';

import { openModal, closeModal } from './conmponents/modal';

import {
  enableValidation,
  clearValidation,
  validationConfig,
  isImageLink,
} from './conmponents/validation';

import {
  getInitialCards,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  addNewCardRequest,
} from './conmponents/api';
// -buttons-

let myUserId;

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = Array.from(document.querySelectorAll('.popup__close'));

// -popups-

const popups = Array.from(document.querySelectorAll('.popup'));
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const avatarImg = document.querySelector('.profile__image');

popups.forEach((popup) => popup.classList.add('popup_is-animated'));

// --вызов и зарытие модальных окон--
// аватар
avatarImg.addEventListener('click', () => {
  formNewAvatar.reset(),
    clearValidation(popupAvatar.querySelector('.popup__form')),
    openModal(popupAvatar);
});

// редактирование профиля

editButton.addEventListener('click', () => {
  name.value = profileName.textContent;
  job.value = profileJob.textContent;
  clearValidation(popupProfileEdit.querySelector('.popup__form')),
    openModal(popupProfileEdit);
});

// новое место

addButton.addEventListener('click', function () {
  formNewPlace.reset(),
    clearValidation(popupNewCard.querySelector('.popup__form')),
    openModal(popupNewCard);
});

// закрыть

closeButtons.forEach((button) =>
  button.addEventListener('click', function () {
    closeModal(button.closest('.popup'));
  })
);

// попап с картинкой

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

// сменить аватар

const formNewAvatar = document.forms['edit-avatar'];
const linkAvatar = formNewAvatar['avatar'];
const saveAvatarButton = formNewAvatar.querySelector('.popup__button');

function handleFormNewAvatarSubmit(evt) {
  updateUserAvatar(linkAvatar.value)
    .then((user) => {
      avatarImg.style = `background-image: url(${user.avatar})`;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  closeModal(popupAvatar);
  saveAvatarButton.textContent = 'Сохранить';
}
formNewAvatar.addEventListener('submit', () => {
  saveAvatarButton.textContent = 'Сохранение...';
  isImageLink(
    handleFormNewAvatarSubmit,
    formNewAvatar,
    linkAvatar,
    saveAvatarButton
  );
});

// редактирвоать профиль

const formEdit = document.forms['edit-profile'];
const name = formEdit.name;
const job = formEdit.description;
const saveUserInfoButton = formEdit.querySelector('.popup__button');

function handleFormEditSubmit(evt) {
  console.log(saveUserInfoButton.textContent);
  updateUserInfo(name.value, job.value)
    .then((user) => {
      profileName.textContent = user.name;
      profileJob.textContent = user.about;
      closeModal(popupProfileEdit);
      saveUserInfoButton.textContent = 'Сохранить';
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}
formEdit.addEventListener('submit', () => {
  saveUserInfoButton.textContent = 'Сохранение...';
  handleFormEditSubmit();
});

// новое место

const formNewPlace = document.forms['new-place'];
const namePlace = formNewPlace['place-name'];
const linkPlace = formNewPlace['link'];
const savePlaceButton = formNewPlace.querySelector('.popup__button');

function handleFormNewPlaceSubmit(evt) {
  addNewCardRequest(namePlace.value, linkPlace.value)
    .then((card) => {
      const newCard = craeteCard(
        card,
        myUserId,
        toggleIsLiked,
        deleteCard,
        openImgPopup
      );
      placesList.prepend(newCard);
      closeModal(popupNewCard);
      savePlaceButton.textContent = 'Сохранить';
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

formNewPlace.addEventListener('submit', () => {
  savePlaceButton.textContent = 'Сохранение...';
  isImageLink(
    handleFormNewPlaceSubmit,
    formNewPlace,
    linkPlace,
    savePlaceButton
  );
});

// --Валидация форм--

enableValidation(validationConfig);

// --API--

Promise.all([getUserInfo(), getInitialCards()])
  .then((result) => {
    const user = result[0];
    const cards = result[1];
    // обрабатываем результат
    (profileName.textContent = user.name),
      (profileJob.textContent = user.about),
      (avatarImg.style = `background-image: url(${user.avatar})`),
      (myUserId = user._id);
    showCards(cards);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

function showCards(cards) {
  cards.forEach((card) => {
    const cardElement = craeteCard(
      card,
      myUserId,
      toggleIsLiked,
      deleteCard,
      openImgPopup
    );
    placesList.append(cardElement);
  });
}

// --API--
