import api from './serviceApi';
import { getToken } from './loginService';

const ALERT_PATH = '/banco-uati/v1/alert';
const SERVANT_PATH = '/banco-uati/v1/servant';

export const countAlerts = async () => {
  const header = { headers: { 'Content-Type': 'application/json', Authorization: `${getToken()}` } };
  const result = await api.get(`${ALERT_PATH}/count`, header);
  return result;
};

export const countServants = async () => {
  const header = { headers: { 'Content-Type': 'application/json', Authorization: `${getToken()}` } };
  const result = await api.get(`${SERVANT_PATH}/countpotentialclients`, header);
  return result;
};

export const countClients = async () => {
  const header = { headers: { 'Content-Type': 'application/json', Authorization: `${getToken()}` } };
  const result = await api.get(`${SERVANT_PATH}/countclients`, header);
  return result;
};

export const getSalaryChart = async () => {
  const header = { headers: { 'Content-Type': 'application/json', Authorization: `${getToken()}` } };
  const result = await api.get(`${SERVANT_PATH}/getsalaryschartdata  `, header);
  return result;
};


export default {
    countAlerts,
    countServants,
  };
  