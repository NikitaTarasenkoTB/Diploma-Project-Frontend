import "../pages/index.css";

import Popup from './components/Popup';
import Validator from './components/Validator';
import MainApi from './api/MainApi';
import Header from './components/Header';
import Search from './components/Search';
import NewsApi from './api/NewsApi';
import Card from './components/Card';
import CardList from './components/CardList';

const loginPopupElement = document.querySelector('.login');
const registrationPopupElement = document.querySelector('.auth');
const thanksPopupElement = document.querySelector('.thanks');
const authBtn = document.querySelector('.header__btn_auth');
const headerElement = document.querySelector('.header');
const searchForm = document.querySelector('.intro__search');
const articles = document.querySelector('.articles');
const moreBtn = document.querySelector('.articles__button');

const loginValidator = new Validator();
const authValidator = new Validator();
const mainApi = new MainApi();
const newsApi = new NewsApi();
const card = new Card(mainApi);
const cardList = new CardList(articles, card, newsApi);
const headerInstance = new Header(true, headerElement, mainApi, cardList);

new Popup(loginPopupElement, registrationPopupElement, thanksPopupElement, authBtn, loginValidator, mainApi, headerInstance, cardList);
new Popup(registrationPopupElement, loginPopupElement, thanksPopupElement, null, authValidator, mainApi, headerInstance, cardList);
new Popup(thanksPopupElement, loginPopupElement);
new Search(searchForm, moreBtn, cardList);
