import { BASE_URL } from "./utils";

const checkResult = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
}

export const register = ({password, email}) => {
  return fetch(`${BASE_URL}signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(res => checkResult(res));
};

export const login = ({password, email}) => {
  return fetch(`${BASE_URL}signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(res => checkResult(res));
};

export const checkToken = (jwt) => {
  return fetch(`${BASE_URL}users/me`, {
    method: 'GET',
    headers: {'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization' : `Bearer ${jwt}`
  }
  })
  .then(res => checkResult(res));
};