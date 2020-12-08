import { showElement, hideElement, clickAnimation } from '../utils/utils';

export default class Search {
  constructor(form, moreBtn, cardList) {
    this._form = form;
    this._input = form.querySelector('input');
    this._error = form.querySelector('.error');
    this._submitBtn = form.querySelector('button');
    this._cardList = cardList;
    this._moreBtn = moreBtn;

    this._setListeneres();
  }
  _submit() {
    this._submitBtn.addEventListener('click', (event) => {
      event.preventDefault();
      if(!this._input.value) {
        showElement(this._error);
        return
      }
      hideElement(this._error);
      this._cardList.getCards(this._input.value);
    })
  }
  _removeErrorOnInput() {
    this._form.addEventListener('input', () => hideElement(this._error))
  }
  _showMore() {
    this._moreBtn.addEventListener('click', () => this._cardList.showCards())
  }
  _setListeneres() {
    clickAnimation(this._submitBtn);
    this._submit();
    this._removeErrorOnInput();
    this._showMore();
  }
}