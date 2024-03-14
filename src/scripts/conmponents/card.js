import { openModal } from './modal';

const cardTemplate = document.querySelector('#card-template').content;
const popupDelete = document.querySelector('.popup_type_delete-card');
let cardToDelete = {};

function craeteCard(
  cardData,
  userId,
  handleLikeCard,
  handleDeleteCard,
  openImgPopup
) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  // удаляем корзинку с чужой карточки

  if (userId !== cardData.owner._id) {
    deleteButton.remove();
  }

  // слушатель на кнопку удаления

  deleteButton.addEventListener('click', () => {
    openModal(popupDelete);
    cardToDelete.card = cardElement;
    cardToDelete.id = cardData._id;
  });

  // обработчик лайка при загруке страницы

  if (cardData.likes.some((liker) => liker._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }

  // слушатель на кнопку лайка

  likeButton.addEventListener('click', (evt) => {
    handleLikeCard(toggleIsLiked(evt.target), cardData, cardElement);
  });

  // слушатель на картинку

  cardElement.addEventListener('click', openImgPopup);

  return cardElement;
}

function toggleIsLiked(likeButton) {
  return likeButton.classList.contains('card__like-button_is-active')
    ? true
    : false;
}

function changeLike(updatedCard, cardElement) {
  cardElement.querySelector('.card__like-counter').textContent =
    updatedCard.likes.length;
  cardElement
    .querySelector('.card__like-button')
    .classList.toggle('card__like-button_is-active');
}

function deleteCard(card) {
  card.remove();
}

export {
  cardTemplate,
  craeteCard,
  toggleIsLiked,
  deleteCard,
  changeLike,
  cardToDelete,
};
