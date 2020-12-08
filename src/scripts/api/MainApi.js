import { mainUrl } from '../constants/constants';

export default class MainApi {
  _parseResponse(response) {
    return response.ok ? response.json() : Promise.reject(response.status);
  }
  signup(email, password, name) {
    return fetch(mainUrl + '/signup', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        name
      })
    })
      .then((response) => this._parseResponse(response))
      // .then((data) => console.log(data, 'signup data here!'))
      // .catch((error) => console.log(error, 'signup error :('))
  }
  signin(email, password) {
    return fetch(mainUrl + '/signin', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((response) => this._parseResponse(response))
      .then((data) => {
        window.localStorage.setItem('token', data.token)
        return Promise.resolve('ok');
      })
      // .catch((error) => console.log(error, 'signin error :('))
  }
  getMe() {
     return fetch(mainUrl + '/users/me', {
      methode: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + window.localStorage.getItem('token')
      }
    })
      .then((response) => this._parseResponse(response))
      // .then((data) => console.log(data))
      // .catch((error) => console.log(error, 'get user data error :('))
  }
  getArticles() {
    return fetch(mainUrl + '/articles', {
      methode: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + window.localStorage.getItem('token')
      }
    })
    .then((response) => this._parseResponse(response))
    // .then((data) => console.log(data))
    // .catch((error) => console.log(error, 'get artickes error :('))
  }
  addArticle(keyword, title, text, date, source, link, image) {
    return fetch(mainUrl + '/articles', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + window.localStorage.getItem('token')
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image
      })
    })
      .then((response) => this._parseResponse(response))
      // .then((data) => console.log(data))
      // .catch((error) => console.log(error, 'add article error :('))
  }
  removeArticle(_id) {
    return fetch(mainUrl + '/articles/' + _id, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + window.localStorage.getItem('token')
      }
    })
      .then((response) => this._parseResponse(response))
      // .then((data) => console.log(data))
      // .catch((error) => console.log(error, 'delete article error :('))
  }
}