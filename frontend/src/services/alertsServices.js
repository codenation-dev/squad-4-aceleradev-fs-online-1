import api from "./serviceApi";
import { getToken } from "./loginService";

const ALERT_PATH = "/banco-uati/v1/alert";

const getHistory = async () => {
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${getToken()}`
    }
  };
  const result = await api.post(`${ALERT_PATH}/getAlerts`, {}, header);

  return result;
};
const getAlertsByUser = async userEmail => {
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${getToken()}`
    }
  };
  const result = await api.post(`${ALERT_PATH}/getAlerts`, {}, header);
  const { data } = result;
  const alerts = data.filter(item => {
    const { user_email } = item;
    return user_email.toLowerCase().search(userEmail) !== -1;
  });

  return alerts;
};

export default { getHistory, getAlertsByUser };
