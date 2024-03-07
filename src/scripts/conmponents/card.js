import { addLikeRequest, removeLikeRequest, removeCard } from './api';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function craeteCard(card, userId, toggleIsLiked, deleteCard, openImgPopup) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__like-counter').textContent =
    card.likes.length;

  // удаляем карзинку с чужой карточки
  if (userId !== card.owner._id) {
    cardElement.querySelector('.card__delete-button').remove();
  } else {
    cardElement
      .querySelector('.card__delete-button')
      .addEventListener('click', function (evt) {
        deleteCard(card)
          .then(() => {
            evt.target.closest('.card').remove();
          })
          .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          });
      });
  }

  // проверка лайка при загрузке
  if (card.likes.some((liker) => liker._id === userId)) {
    cardElement
      .querySelector('.card__like-button')
      .classList.add('card__like-button_is-active');
  } else {
    cardElement
      .querySelector('.card__like-button')
      .classList.remove('card__like-button_is-active');
  }

  cardElement
    .querySelector('.card__like-button')
    .addEventListener('click', function (evt) {
      toggleIsLiked(card, cardElement)
        .then((updatedCard) => {
          cardElement.querySelector('.card__like-counter').textContent =
            updatedCard.likes.length;
          evt.target.classList.toggle('card__like-button_is-active');
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    });

  cardElement.addEventListener('click', openImgPopup);

  return cardElement;
}

function toggleIsLiked(card, cardElement) {
  if (
    cardElement
      .querySelector('.card__like-button')
      .classList.contains('card__like-button_is-active')
  ) {
    return removeLikeRequest(card._id);
  } else {
    return addLikeRequest(card._id);
  }
}

function deleteCard(card) {
  return removeCard(card._id);
}

export { placesList, cardTemplate, craeteCard, toggleIsLiked, deleteCard };
