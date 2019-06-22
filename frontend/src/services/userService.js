import { getToken } from './loginService';
import api from './serviceApi';

const USER_PATH = '/banco-uati/v1/user';

export const getUsers = async () => {
  const header = { headers: { 'Content-Type': 'application/json', Authorization: `${getToken()}` } };
  const result = await api.post(`${USER_PATH}/getUsers`, {}, header);
  return result;
};

export const updateReceiveAlert = async (users) => {
  console.log('teste', users);
  const header = { headers: { 'Content-Type': 'application/json', Authorization: `${getToken()}` } };
  const result = await api.post(`${USER_PATH}/updateReciveAlert`, users, header);
  return result;
};


export default {
  getUsers,
  updateReceiveAlert,
};
