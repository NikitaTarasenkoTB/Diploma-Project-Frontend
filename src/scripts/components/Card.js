import { card, cardLabel, cardTrash } from '../constants/constants';

export default class Card {
  constructor(mainApi) {
    this._mainApi = mainApi;

    this._toggleCard = this._toggleCard.bind(this);
    this._removeSavedCard = this._removeSavedCard.bind(this);
  }
  createCard(keyword, title, text, date, source, link, image, location) {
    const bufferElement = document.createElement('div');
    bufferElement.insertAdjacentHTML('afterbegin', card);
    const cardElement = bufferElement.firstElementChild;

    cardElement.setAttribute('data-keyword', keyword);
    cardElement.setAttribute('data-link', link);
    cardElement.querySelector('img').src = image;
    cardElement.querySelector('.articles__date').textContent = date;
    cardElement.querySelector('.articles__header').textContent = title;
    cardElement.querySelector('.articles__text').textContent = text;
    cardElement.querySelector('.articles__source').textContent = source;

    cardElement.addEventListener('click', () => this._openLink(link));

    if(location === 'index') {
      cardElement.insertAdjacentHTML('afterbegin', cardLabel);
      if(!window.localStorage.getItem('token')) {
        cardElement.querySelector('.articles__need-auth').classList.add('not-auth');
      } else {
        cardElement.querySelector('.articles__label').addEventListener('click', this._toggleCard);
      }
    } else {
      cardElement.insertAdjacentHTML('afterbegin', cardTrash);
      cardElement.querySelector('.articles__word').textContent = keyword;
      cardElement.querySelector('.articles__trash').addEventListener('click', this._removeSavedCard);
    }

    return cardElement;
  }
  _toggleCard(event) {
    event.stopPropagation();
    const cardElement = event.target.closest('.articles__card');
    const label = cardElement.querySelector('.articles__label');
    label.classList.contains('active') ? this._removeCard(cardElement, label) : this._saveCard(cardElement, label);
  }
  _saveCard(cardElement, label) {
    const keyword = cardElement.dataset.keyword;
    const title = cardElement.querySelector('.articles__header').textContent;
    const text = cardElement.querySelector('.articles__text').textContent;
    const date = cardElement.querySelector('.articles__date').textContent;
    const source = cardElement.querySelector('.articles__source').textContent;
    const link = cardElement.dataset.link;
    const image = cardElement.querySelector('img').src;
    this._mainApi.addArticle(keyword, title, text, date, source, link, image)
      .then((response) => {
        cardElement.id = response.data._id;
        label.classList.add('active');
      })
      .catch((error) => console.log(error))
  }
  _removeCard(cardElement, label) {
    this._mainApi.removeArticle(cardElement.id)
      .then(() => {
        label.classList.remove('active');
      })
      .catch((error) => console.log(error))
  }
  _removeSavedCard(event) {
    event.stopPropagation();
    const cardElement = event.target.closest('.articles__card');
    this._mainApi.removeArticle(cardElement.id)
      .then(() => {
        cardElement.remove();
      })
      .catch((error) => console.log(error))
  }
  _openLink(link) {
    const aElement = document.createElement('a');
    aElement.href = link;
    aElement.setAttribute('target', '_blank');
    aElement.click();
  }
}