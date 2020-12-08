import { mounths } from '../constants/constants';

export function showElement(domElement) {
  domElement.classList.add('active');
  setTimeout(() => {
    domElement.classList.add('appear');
  }, 10);
}

export function hideElement(domElement) {
  domElement.classList.remove('appear');
  domElement.classList.remove('active');
}

export function clickAnimation(btn) {
  btn.addEventListener('mousedown', (event) => {
    event.target.classList.add('clicked');
  })
  btn.addEventListener('mouseup', (event) => {
    event.target.classList.remove('clicked');
  })
}

export function inputsArray(form) {
  const formArray = Array.from(form.elements);
  formArray.pop();
  return formArray;
}

export function getDate() {
  const days = 7;
  const prevDate = new Date(Date.now() - 24 * 3600 * 1000 * days);
  return prevDate.getFullYear() + '-' + (prevDate.getMonth() + 1) + '-' + prevDate.getDate();
}

export function parseDate(date) {
  const dateObect = new Date(Date.parse(date));
  return dateObect.getDate() + ' ' + mounths[dateObect.getMonth()] + ', ' + dateObect.getFullYear();
}