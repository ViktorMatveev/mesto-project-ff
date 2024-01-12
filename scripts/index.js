// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const places = document.querySelector('.places');
const placesList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');

const cardTemplate = document.querySelector('#card-template').content;

function craeteCard(cardInfoName, cardInfoLink, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__image').src = cardInfoLink;
  cardElement.querySelector('.card__image').alt = cardInfoName;
  cardElement.querySelector('.card__title').textContent = cardInfoName;

  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  return cardElement;
}

function deleteCard(element) {
  element.closest('.card').remove();
}

function showCards(cards) {
  cards.forEach((card) => {
    const cardElement = craeteCard(card.name, card.link, deleteCard);
    placesList.append(cardElement);
  });
}

showCards(initialCards);
