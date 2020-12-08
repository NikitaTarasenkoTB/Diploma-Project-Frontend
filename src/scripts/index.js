import "../pages/index.css";

const burger = document.querySelector('.header__burger')
burger.addEventListener('click', () => { 
  document.querySelector('.header').classList.toggle('active');
});

const articlesContainer = document.querySelector('.articles__container');
articlesContainer.addEventListener('click', (event) => {
  event.target.closest('.articles__label').classList.toggle('active');
})

const btn = document.querySelectorAll('.btn');
btn.forEach(item => {
  item.addEventListener('mousedown', (event) => {
    event.target.classList.add('clicked');
  })
  item.addEventListener('mouseup', (event) => {
    event.target.classList.remove('clicked');
  })
})

function showElement(domElement) {
  domElement.classList.add('active');
  setTimeout(() => {
    domElement.classList.add('appear');
  }, 10);
}
function hideElement(domElement) {
  domElement.classList.remove('appear');
  domElement.classList.remove('active');
  // domElement.addEventListener('transitionend', () => {
  //   domElement.classList.remove('active');
  // })
}

const findButton = document.querySelector('.intro__button');
const articles = document.querySelector('.articles');
const cards = document.querySelectorAll('.articles__card');
findButton.addEventListener('click', () => {
  const articlesPreloader = document.querySelector('.articles__loading');
  const articlesNotFound = document.querySelector('.articles__notfound');
  const articlesContent = document.querySelector('.articles__content');

  cards.forEach((item, index) => {
    index < 3 ? showElement(item) : 0;
  })

  articles.classList.add('active');
  showElement(articlesPreloader);
  setTimeout(() => {
    hideElement(articlesPreloader);
    showElement(articlesNotFound);
  }, 1000);
  setTimeout(() => {
    hideElement(articlesNotFound);
    showElement(articlesContent);
  }, 2000);
})

const showMore = document.querySelector('.articles__button');
let page = 2;
showMore.addEventListener('click', () => {
  cards.forEach((item, index) => {
    index > (page - 1) * 3 - 1 && index < page * 3 ? showElement(item) : 0;
  });
  page++;
})

const loginPopup = document.querySelector('.login');
const authPopup = document.querySelector('.auth');
const loginChange = document.querySelector('.login__change');
const authChange = document.querySelector('.auth__change');
loginChange.addEventListener('click', () => {
  hideElement(loginPopup);
  showElement(authPopup);
});
authChange.addEventListener('click', () => {
  hideElement(authPopup);
  showElement(loginPopup);
})

function preventScroll(event) {
  event.preventDefault();
  event.stopPropagation();
}

const popups = document.querySelector('.popups');
const showPopups = document.querySelector('.header__btn_auth');
showPopups.addEventListener('click', () => {
  showElement(popups);
  burger.classList.add('hide');
  document.querySelector('.header').classList.remove('active');

  document.querySelector('body').addEventListener('mousewheel', preventScroll, {passive: false});
  document.querySelector('body').classList.add('preventMobileScroll');
})
const closeBtns = document.querySelectorAll('.popups__close');
closeBtns.forEach(item => {
  item.addEventListener('click', () => {
    hideElement(popups);
    burger.classList.remove('hide');
    document.querySelector('body').removeEventListener('mousewheel', preventScroll, {passive: false});
    document.querySelector('body').classList.remove('preventMobileScroll');
  })
})

const authBtn = document.querySelector('.auth__btn');
const thanksPopup = document.querySelector('.thanks');
authBtn.addEventListener('click', (event) => {
  event.preventDefault();
  hideElement(authPopup);
  showElement(thanksPopup);
})

const thanksChange = document.querySelector('.thanks__change');
thanksChange.addEventListener('click', () => {
  hideElement(thanksPopup);
  showElement(loginPopup);
})