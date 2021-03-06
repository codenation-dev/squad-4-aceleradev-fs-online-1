import { localStorageWrapper } from '../helpers';
import api from './serviceApi';

const NS_LOGGED_USER_EMAIL = 'logged_user_email';
const NS_LOGGED_USER_NAME = 'logged_user_name';
const NS_LOGGED_USER = 'logged_user';
const NS_LOGGED_USER_PERMISSION = 'admin_user';
const NS_TOKEN = 'token';
const LOGIN_PATH = '/banco-uati/v1/login';

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
  const result = await api.post(`${LOGIN_PATH}/signin`, signinRequest, header);
  if (result.status === 200) {
    let adminPermission = false;
    if (result.data.username === 'admin') {
      adminPermission = true;
    }
    localStorageWrapper.set(NS_LOGGED_USER_NAME, result.data.name);
    localStorageWrapper.set(NS_LOGGED_USER_PERMISSION, adminPermission);
    localStorageWrapper.set(NS_LOGGED_USER_EMAIL, email);
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
  await api.post(`${LOGIN_PATH}/save`, registerRequest, header);
};

export const isLogged = () => !!localStorageWrapper.get(NS_LOGGED_USER);

export const logout = () => {
  localStorageWrapper.set(NS_LOGGED_USER_EMAIL, null);
  localStorageWrapper.set(NS_LOGGED_USER_NAME, null);
  localStorageWrapper.set(NS_LOGGED_USER, null);
  localStorageWrapper.set(NS_LOGGED_USER_PERMISSION, null);
  localStorageWrapper.set(NS_TOKEN, null);
};
export const getPermission = () => isLogged && localStorageWrapper.get(NS_LOGGED_USER_PERMISSION);
export const getMail = () => isLogged && localStorageWrapper.get(NS_LOGGED_USER_EMAIL);
export const getUser = () => isLogged && localStorageWrapper.get(NS_LOGGED_USER);
export const getUserName = () => isLogged && localStorageWrapper.get(NS_LOGGED_USER_NAME);
export const getToken = () => isLogged && localStorageWrapper.get(NS_TOKEN);

export default {
  setUserToLocalStorage,
  isLogged,
  getUser,
  doLogin,
};
