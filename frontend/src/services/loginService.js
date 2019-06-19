import { localStorageWrapper } from '../helpers';

const NS_LOGGED_USER = 'logged_user';

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

export const isLogged = () => !!localStorageWrapper.get(NS_LOGGED_USER);

export const logout = () => localStorageWrapper.set(NS_LOGGED_USER, null);

export const getUser = () => isLogged && localStorageWrapper.get(NS_LOGGED_USER);

export default {
  setUserToLocalStorage,
  isLogged,
  getUser,
};
