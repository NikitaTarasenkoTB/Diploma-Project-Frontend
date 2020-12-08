export const mainUrl = 'http://130.193.56.28/api';
export const newsApiKey = '7606c922c5b1443db74d019404c8ada4';
export const newsApiUrl = (process.env.NODE_ENV === 'production' ? 'https://nomoreparties.co/news/v2/' : 'https://newsapi.org/v2/')  + 'everything?language=ru&pageSize=100&sortBy=latest&apiKey=7606c922c5b1443db74d019404c8ada4';
export const errors = {
  email: 'Неправильный формат email',
  length: 'Длина должна быть от 2 до 30 символов',
  password: 'Пароль должен быть длинее 8 символов',
  required: 'Поле должно быть заполнено',
  serverError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  notFound: 'К сожалению по вашему запросу ничего не найдено.'
}
export const mounths = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
]
export const emailRegexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const card = `
  <div class="articles__card active appear">
    <img src="<%=require('./img/news.jpg').default%>" alt="Обложка статьи" class="articles__cover">
    <div class="articles__info">
      <div class="articles__top">
        <p class="articles__date">2 августа, 2019</p>
        <h3 class="articles__header">Национальное достояние – парки</h3>
        <p class="articles__text">В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.</p>
      </div>
      <p class="articles__source">Лента.ру</p>
    </div>
  </div>
`;
export const cardLabel = `
  <div class="articles__label">
    <svg class="articles__label-icon" width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M6.38218 12.7137L1 16.9425V1L13 1V16.9425L7.61782 12.7137L7 12.2283L6.38218 12.7137Z" stroke="#B6BCBF" stroke-width="2"/>
    </svg>
    <p class="articles__need-auth">Войдите, чтобы сохранять статьи</p>
  </div>
`;
export const cardTrash = `
<p class="articles__word">Фотография</p>
<div class="articles__trash">
  <svg fill="none" class="articles__trash-icon" viewBox="0 0 24 24">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15 3H9v2H3v2h18V5h-6V3zM5 9v11a2 2 0 002 2h10a2 2 0 002-2V9h-2v11H7V9H5zm4 0v9h2V9H9zm4 0v9h2V9h-2z" fill="#1A1B22"/>
  </svg>
  <p class="articles__need-auth articles__need-auth_trash">Убрать из сохранённых</p>
</div>
`;