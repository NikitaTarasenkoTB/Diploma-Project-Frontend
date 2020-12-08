import { showElement, hideElement } from '../utils/utils';

export default class Header {
  constructor(isMainPage, header, mainApi, cardList, info) {
    this._isMainPage = isMainPage;
    this._header = header;
    this._authBtn = header.querySelector('.header__btn_auth');
    this._exitBtn = header.querySelector('.header__btn_exit');
    this._name = header.querySelector('.header__name');
    this._savedArticlesBtn = header.querySelector('.header__main_articles');
    this._burger = header.querySelector('.header__burger');
    this._mainApi = mainApi;
    this._cardList = cardList;
    this._info = info;

    this.render();
    this._setListeners();
    this._mobileMenu();
  }
  render() {
    this._header.classList.remove('active');
    !this._isMainPage ? this._header.classList.add('header_black') : 0;
    if(!window.localStorage.getItem('token')) {
      hideElement(this._savedArticlesBtn);
      hideElement(this._exitBtn);
      showElement(this._authBtn);
      return
    }
    this._mainApi.getMe()
      .then((response) => {
        this._name.textContent = response.data.name;
        if(this._info) {
          this._info.setName(response.data.name);
        }
        showElement(this._savedArticlesBtn);
        if(this._authBtn) {
          hideElement(this._authBtn);
          showElement(this._exitBtn);
        }
      })
      .catch((error) => console.log(error))
  }
  _mobileMenu() {
    this._burger.addEventListener('click', () => {
      this._header.classList.toggle('active');
    })
  }
  _setListeners() {
    this._exitBtn.addEventListener('click', () => {
      window.localStorage.removeItem('token');
      if(this._info) {
        window.location.replace(window.location.origin + '/index.html');
        return;
      }
      this.render();
      this._cardList.reRender();
    })
  }
}