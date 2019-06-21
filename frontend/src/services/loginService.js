import { localStorageWrapper } from '../helpers';

const axios = require('axios');

const NS_LOGGED_USER = 'logged_user';
const NS_TOKEN = 'token';
const LOGIN_PATH = 'http://localhost:8080/banco-uati/v1/login';

export const setUserToLocalStorage = ({ username }) => {
  const user = {
    username,
  };
  if (!user) {
    throw new Error('User is not provided');
  }

  localStorageWrapper.set(NS_LOGGED_USER, user);

  return true;
};

export const doLogin = async (email, password) => {
  const header = { headers: { 'Content-Type': 'application/json' } };
  const signinRequest = JSON.stringify({
    email: `${email}`,
    password: `${password}`,
  });
  const result = await axios.post(`${LOGIN_PATH}/signin`, signinRequest, header);
  if (result.status === 200) {
    localStorageWrapper.set(NS_LOGGED_USER, result.data.username);
    localStorageWrapper.set(NS_TOKEN, result.data.token);
  }
};

export const register = async (username, nome, email, password) => {
  const header = { headers: { 'Content-Type': 'application/json' } };
  const registerRequest = JSON.stringify({
    username: `${username}`,
    nome: `${nome}`,
    email: `${email}`,
    password: `${password}`,
  });
  await axios.post(`${LOGIN_PATH}/save`, registerRequest, header);
};

export const isLogged = () => !!localStorageWrapper.get(NS_LOGGED_USER);

export const logout = () => {
  localStorageWrapper.set(NS_LOGGED_USER, null);
  localStorageWrapper.set(NS_TOKEN, null);
};

export const getUser = () => isLogged && localStorageWrapper.get(NS_LOGGED_USER);

export default {
  setUserToLocalStorage,
  isLogged,
  getUser,
  doLogin,
};
