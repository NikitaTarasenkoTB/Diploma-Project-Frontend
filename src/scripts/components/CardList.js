import { showElement, hideElement, parseDate } from '../utils/utils';
import { errors } from '../constants/constants';

export default class CardList {
  constructor(container, cardConstructor, newsApi, mainApi, info) {
    this._container = container;
    this._contentContainer = container.querySelector('.articles__content');
    this._cardsContainer = container.querySelector('.articles__container');
    this._notFound = container.querySelector('.articles__notfound');
    this._loader = container.querySelector('.articles__loading');
    this._moreBtn = container.querySelector('.articles__button');
    this._newsApi = newsApi;
    this._mainApi = mainApi;
    this._info = info;
    this._cardConstructor = cardConstructor;
    this._page = 1;

    this._info ? this.getSavedCards() : 0;
  }
  getCards(keyWord) {
    this._keyWord = keyWord;
    this._removeAllCards();
    this._page = 1;
    showElement(this._container);
    hideElement(this._notFound);
    hideElement(this._contentContainer);
    showElement(this._loader);
    this._newsApi.getNews(keyWord)
      .then((data) => {
        if(!data.articles.length) {
          throw new Error('notFoundError');
        }
        this._cardsArray = data.articles;
        this.showCards();
        hideElement(this._loader);
        showElement(this._contentContainer);
      })
      .catch((error) => {
        error.message === 'notFoundError' ?
          this._notFound.querySelector('.articles__notfound-subtitle').textContent = errors.notFound :
          this._notFound.querySelector('.articles__notfound-subtitle').textContent = errors.serverError;
        hideElement(this._loader);
        showElement(this._notFound);
      })
  }
  showCards() {
    this._renderMoreBtn();
    this._cardsArray.forEach((item ,index) => {
      if(index >= (this._page - 1) * 3 && index <= this._page * 3 - 1) {
        item.publishedAt = parseDate(item.publishedAt);
        this._cardsContainer.append(this._cardConstructor.createCard(
          this._keyWord,
          item.title,
          item.description,
          item.publishedAt,
          item.source.name,
          item.url,
          item.urlToImage,
          'index'
        ))
      }
    })
    this._page++;
  }
  _renderMoreBtn() {
    if(this._cardsArray.length < this._page * 3) {
      hideElement(this._moreBtn);
      return
    }
    showElement(this._moreBtn);
  }
  _removeAllCards() {
    this._cardsContainer.querySelectorAll('.articles__card').forEach((item) => item.remove())
  }
  _showAllCards(cardsArray, page) {
    if(cardsArray) {
      cardsArray.forEach((item, index) => {
        if(index < (this._page - 1) * 3 || page === 'articles') {
          const cardElement = this._cardConstructor.createCard(
            page === 'index' ? this._keyWord : item.keyword,
            item.title,
            page === 'index' ? item.description : item.text,
            page === 'index' ? item.publishedAt : item.date,
            page === 'index' ? item.source.name : item.source,
            page === 'index' ? item.url : item.link,
            page === 'index' ? item.urlToImage: item.image,
            page,
          )
          item._id ? cardElement.id = item._id : 0;
          this._cardsContainer.append(cardElement);
        }
      })
    }
  }
  reRender() {
    this._removeAllCards();
    this._showAllCards(this._cardsArray, 'index');
  }
  getSavedCards() {
    this._mainApi.getArticles()
      .then((response) => {
        this._showAllCards(response.data, 'articles');
        this._info.render(response.data);
      })
     .catch((error) => console.log(error))
  }
}