export default class Info {
  constructor(infoContainer, cardsContainer) {
    this._infoContainer = infoContainer;
    this._cardsContainer = cardsContainer;
    this._keysContainer = infoContainer.querySelector('.info__subtitle');
    this._name = infoContainer.querySelector('.info__title-name');
  }
  render(cardsArray) {
    this._countArticles(cardsArray.length);
    this._countKeys(cardsArray);
  }
  setName(name) {
    this._name.textContent = name;
  }
  _countArticles(length) {
    const countElement = this._infoContainer.querySelector('.info__title-count');
    countElement.textContent = length === 1 ? length + ' сохраненная ' : length > 1 && length < 5 ? length + ' сохраненные ' : length + ' сохраненных ';
  }
  _countKeys(cardsArray) {
    const keys = [];
    cardsArray.forEach((cardItem) => {
      let matchIndex = keys.findIndex((keyItem) => keyItem.keyword === cardItem.keyword);
      matchIndex !== -1 ? keys[matchIndex].count++ : keys.push({ keyword: cardItem.keyword, count: 1 });
    })
    keys.sort((a, b) => {
      if(a.count < b.count) { return 1 }
      if(a.count > b.count) { return -1 }
      if(a.count == b.count) { return 0 }
    })
    if(keys.length <= 3) {
      keys.forEach((item) => {
        this._createTag(item.keyword + ' ');
      })
    } else {
      keys.forEach((item, index) => {
        if(index < 2) {
          this._createTag(item.keyword + ' ');
        }
      })
      this._createTag('и ' + (keys.length - 2) + ' другим');
    }
  }
  _createTag(keyword) {
    const tag = document.createElement('span');
    tag.classList.add('info__tag');
    tag.textContent = keyword;
    this._keysContainer.append(tag);
  }
}