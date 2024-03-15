import '../pages/index.css';

import { craeteCard, deleteCard, changeLike } from './conmponents/card';

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
  addLikeRequest,
  removeLikeRequest,
  removeCard,
} from './conmponents/api';

let myUserId;
const placesList = document.querySelector('.places__list');
const cardToDelete = {};

// -buttons-

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = Array.from(document.querySelectorAll('.popup__close'));

// -popups-

const popups = Array.from(document.querySelectorAll('.popup'));
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupDelete = document.querySelector('.popup_type_delete-card');
const cardTitle = popupImage.querySelector('.popup__caption');
const scaledImg = popupImage.querySelector('.popup__image');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const avatarImg = document.querySelector('.profile__image');

popups.forEach((popup) => popup.classList.add('popup_is-animated'));

// слушатель обработчика лайка

function handleLikeCard(status, cardData, card) {
  if (!status) {
    addLikeRequest(cardData._id)
      .then((res) => changeLike(res, card))
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  } else {
    removeLikeRequest(cardData._id)
      .then((res) => changeLike(res, card))
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  }
}

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

closeButtons.forEach((button) =>
  button.addEventListener('click', function () {
    closeModal(button.closest('.popup'));
  })
);

// попап с картинкой

function openImgPopup(evt) {
  if (evt.target.classList.contains('card__image')) {
    openModal(popupImage);
    scaledImg.src = evt.target.src;
    scaledImg.alt = evt.target.alt;
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
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
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
  updateUserInfo(name.value, job.value)
    .then((user) => {
      profileName.textContent = user.name;
      profileJob.textContent = user.about;
      closeModal(popupProfileEdit);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  saveUserInfoButton.textContent = 'Сохранить';
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
    .then((cardData) => {
      const newCard = craeteCard(
        cardData,
        myUserId,
        handleLikeCard,
        handleDeleteCard,
        openImgPopup
      );
      placesList.prepend(newCard);
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  savePlaceButton.textContent = 'Сохранить';
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

// удаление карточки

const formDeleteCard = document.forms['delete-card'];

function handleDeleteCard(cardElement, cardData) {
  openModal(popupDelete);
  cardToDelete.card = cardElement;
  cardToDelete.id = cardData._id;
}

formDeleteCard.addEventListener('submit', () => {
  removeCard(cardToDelete.id)
    .then((res) => {
      deleteCard(cardToDelete.card);
      closeModal(popupDelete);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
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
  cards.forEach((cardData) => {
    const cardElement = craeteCard(
      cardData,
      myUserId,
      handleLikeCard,
      handleDeleteCard,
      openImgPopup
    );
    placesList.append(cardElement);
  });
}
