import { showElement, hideElement, clickAnimation, inputsArray } from '../utils/utils';

export default class Popup {
  constructor(popupElement, swapPopupElement, thanksPopupElement, authBtn, validator, mainApi, header, cardList) {
    this._popupElement = popupElement;
    this._swapPopupElement = swapPopupElement;
    this._thanksPopup = thanksPopupElement;
    this._popupContainer = popupElement.closest('.popups');
    this._submitBtn = popupElement.querySelector('.btn');
    this._closeBtn = popupElement.querySelector('.popups__close');
    this._swapBtn = popupElement.querySelector('.swap-btn');
    this._authBtn = authBtn;
    this._authError = popupElement.querySelector('.btn-error');
    this._btnError = popupElement.querySelector('.btn-error');
    this._validator = validator;
    this._form = popupElement.querySelector('form');
    this._mainApi = mainApi;
    this._header = header;
    this._cardList = cardList;

    this._setListeners();
  }
  _open() {
    this._authBtn.addEventListener('click', () => {
      this._popupContainer.querySelectorAll('.popups__container').forEach((item) => {
        hideElement(item);
        this._validator.resetForm();
      });

      hideElement(this._authError);
      showElement(this._popupElement);
      showElement(this._popupContainer);
    })
  }
  _close() {
    this._closeBtn.addEventListener('click', () => {
      hideElement(this._popupContainer);
      this._validator.resetForm();
    })
  }
  _swapPopup() {
    this._swapBtn.addEventListener('click', () => {
      this._validator ? this._validator.resetForm() : 0;

      hideElement(this._popupElement);
      showElement(this._swapPopupElement);
    })
  }
  _submit() {
    this._submitBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this._form.name === 'auth' ? this._authFormHandler() : this._loginFormHandler();
    })
  }
  _authFormHandler() {
    this._mainApi.signup(
      this._form.elements[0].value,
      this._form.elements[1].value,
      this._form.elements[2].value
    )
      .then(() => {
        hideElement(this._popupElement);
        showElement(this._thanksPopup);
      })
      .catch((error) => {
        error !== 409 ? this._authError.textContent = 'Ошибка регистрации.' : 0;
        showElement(this._authError);
      })
  }
  _loginFormHandler() {
    this._mainApi.signin(
      this._form.elements[0].value,
      this._form.elements[1].value
    )
      .then(() => {
        this._cardList.reRender();
        this._header.render();
        hideElement(this._popupContainer);
      })
      .catch(() => {
        showElement(this._authError);
      })
  }
  _removeBtnError() {
    inputsArray(this._form).forEach((item) => {
      item.addEventListener('input', () => hideElement(this._authError))
    })
  }
  _setListeners() {
    this._authBtn ? this._open() : 0;
    if(this._form) {
      this._submit();
      clickAnimation(this._submitBtn);
      this._validator.setListeners(this._form);
      this._removeBtnError();
    }
    this._swapPopup();
    this._close();
  }
}