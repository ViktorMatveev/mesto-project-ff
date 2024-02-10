const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function craeteCard(
  cardInfoName,
  cardInfoLink,
  toggleIsLiked,
  deleteCard,
  openImgPopup
) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = cardInfoLink;
  cardElement.querySelector('.card__image').alt = cardInfoName;
  cardElement.querySelector('.card__title').textContent = cardInfoName;

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

export { placesList, cardTemplate, craeteCard, toggleIsLiked, deleteCard };
