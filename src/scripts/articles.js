import "../pages/articles.css";

import MainApi from './api/MainApi';
import NewsApi from './api/NewsApi';
import Header from './components/Header';
import Card from './components/Card';
import CardList from './components/CardList';
import Info from './components/Info';

const headerElement = document.querySelector('.header');
const articles = document.querySelector('.articles');
const cardsContainer = document.querySelector('.articles__container');
const infoContainer = document.querySelector('.info');

const mainApi = new MainApi();
const newsApi = new NewsApi();
const card = new Card(mainApi);
const info = new Info(infoContainer, cardsContainer);
const cardList = new CardList(articles, card, newsApi, mainApi, info);
new Header(false, headerElement, mainApi, cardList, info);

console.log(window.location);
!window.localStorage.getItem('token') ? window.location.replace(window.location.origin + '/index.html') : 0;