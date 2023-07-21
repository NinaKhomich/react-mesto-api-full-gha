import { apiSettings } from "./utils";

class Api {
  constructor({link, headers}) {
    this._link = link;
    this._headers = headers;
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  async setProfileInfo() {
    const res = await fetch(`${this._link}users/me`, {
      headers: this._headers
    });
    return this._checkResult(res);
  }

  editProfileInfo(formValues) {
    return fetch(`${this._link}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: formValues.name,
        about: formValues.about
      })
    })
    .then(res => this._checkResult(res));
  }

  editProfileAvatar(formValues) {
    return fetch(`${this._link}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: formValues.avatar,
      })
    })
    .then(res => this._checkResult(res));
  }

  getInitialCards() {
    return fetch(`${this._link}cards`, {
      headers: this._headers
    })
    .then(res => this._checkResult(res));
  }

  addCard(formValues) {
    return fetch(`${this._link}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: formValues.title,
        link: formValues.link
      })
    })
    .then(res => this._checkResult(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._link}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._checkResult(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._link}cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers
    })
    .then(res => this._checkResult(res));
  }
}

const api = new Api(apiSettings);

export { api };