import { data } from 'autoprefixer';
import { newsApiUrl } from '../constants/constants';
import { getDate } from '../utils/utils';

export default class NewsApi {
  _parseResponse(response) {
    return response.ok ? response.json() : Promise.reject(response);
  }
  getNews(keyWord) {
    return fetch(newsApiUrl + '&q=' + keyWord + '&from=' + getDate())
      .then((response) => this._parseResponse(response))
      // .then((data) => console.log(data.articles))
      // .catch((error) => console.log(error, 'newsApi error :('))
  }
}