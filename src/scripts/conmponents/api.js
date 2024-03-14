// --работа с API--

// Токен: 6822d671-11c6-4eec-8c5d-59a6a77e5591
// Идентификатор группы: wff-cohort-9

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-9',
  headers: {
    authorization: '6822d671-11c6-4eec-8c5d-59a6a77e5591',
    'Content-Type': 'application/json',
  },
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

// запрос на получение карточек

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

// запрос на инфо о пользователе

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

// запрос на изменение информации о пользователе

const updateUserInfo = (userName, userAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name: userName, about: userAbout }),
  }).then((res) => checkResponse(res));
};

// запрос на изменение аватара пользователя

const updateUserAvatar = (userAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: userAvatar }),
  }).then((res) => checkResponse(res));
};

// запрос на добавление карточки на сервер

const addNewCardRequest = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name: cardName, link: cardLink }),
  }).then((res) => checkResponse(res));
};

// запрос на добаление лайка

const addLikeRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

// запрос на снятие лайка

const removeLikeRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

// запрос на удаление карточки

const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

export {
  getInitialCards,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  addNewCardRequest,
  addLikeRequest,
  removeLikeRequest,
  removeCard,
};
