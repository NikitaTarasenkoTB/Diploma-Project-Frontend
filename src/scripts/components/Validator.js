import { errors, emailRegexp } from '../constants/constants';
import { showElement, hideElement, inputsArray } from '../utils/utils';

export default class Validator {
  constructor() {
    this._formHandler = this._formHandler.bind(this);
  }
  _isInputValid(input) {
    input.setCustomValidity('');
    if (input.type === 'email') {
      if(!emailRegexp.test(input.value) || input.validity.typeMismatch) {
        input.setCustomValidity(errors.email);
        return false;
      }
    }
    if((input.validity.tooShort || input.validity.tooLong) && input.type === 'text') {
      input.setCustomValidity(errors.length);
      return false;
    }
    if(input.validity.tooShort && input.type === 'password') {
      input.setCustomValidity(errors.password);
      return false;
    }
    if(input.validity.valueMissing) {
      input.setCustomValidity(errors.required);
      return false;
    }
    return input.validity.valid;
  }
  _isFormValid() {
    return inputsArray(this._form).every(this._isInputValid);
  }
  _showErrorMessage(input) {
    const errorElement = this._form.querySelector(`#error-${input.id}`);
    errorElement.textContent = input.validationMessage;
    showElement(errorElement);
  }
  _removeErrorMessage(input) {
    const errorElement = this._form.querySelector(`#error-${input.id}`);
    hideElement(errorElement);
  }
  _removeAllErrorMessages() {
    inputsArray(this._form).forEach((item) => {
      this._removeErrorMessage(item);
    });
  }
  _setBtnState(validity) {
    const button = this._form.querySelector('button');
    if (!validity) {
      button.classList.add('btn_locked');
      button.setAttribute('disabled', true);
      return;
    }
    button.classList.remove('btn_locked');
    button.removeAttribute('disabled');
  }
  _formHandler(event) {
    const input = event.target;
    this._isInputValid(input);
    !this._isInputValid(input) ? this._showErrorMessage(input) : this._removeErrorMessage(input);
    this._setBtnState(this._isFormValid(this._form));
  }
  setListeners(form) {
    this._form = form;
    form.addEventListener('input', this._formHandler);
  }
  resetForm() {
    this._form.reset();
    this._setBtnState(this._isFormValid(this._form));
    this._removeAllErrorMessages(this._form);
  }
  // removeListeners() {
  //   this._setBtnState(this._isFormValid(this._form));
  //   this._removeAllErrorMessages(this._form);
  //   this._form.removeEventListener('input', this._formHandler);
  // }
}