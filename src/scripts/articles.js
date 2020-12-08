import "../pages/articles.css";

const burger = document.querySelector('.header__burger')
burger.addEventListener('click', () => { 
  document.querySelector('.header').classList.toggle('active');
});

const articlesContainer = document.querySelector('.articles__container');
articlesContainer.addEventListener('click', (event) => {
  event.target.closest('.articles__label').classList.toggle('active');
})