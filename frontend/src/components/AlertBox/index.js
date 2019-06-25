import React from 'react';
import PropTypes from 'prop-types';

import { AlertContainer } from './styles';

const AlertBox = ({
  date, hour, userDestination, emailDestination, clientName,
}) => (
  <AlertContainer>
    <div className=" alert alert-primary" role="alert">
      Novo alerta emitido para <b>{userDestination}</b>. Detectamos <b>{clientName}</b> como um
      potencial cliente!
      <div className="collapse" id="alert1">
        <ul>
          <li className="list-group-item list-group-item-action ">
            <i className="fa fa-calendar-o" /> <b>Data:</b> {date}
          </li>
          <li className="list-group-item list-group-item-action ">
            <i className="fa fa-clock-o" /> <b>Hora:</b> {hour}
          </li>
          <li className="list-group-item list-group-item-action ">
            <i className="fa fa-user" /> <b>Alerta emitido para:</b> {userDestination}
          </li>
          <li className="list-group-item list-group-item-action ">
            <i className="fa fa-at" /> <b>Email do usuário:</b> {emailDestination}
          </li>
        </ul>
      </div>
    </div>
  </AlertContainer>
);

AlertBox.propTypes = {
  date: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired,
  userDestination: PropTypes.string.isRequired,
  emailDestination: PropTypes.string.isRequired,
  clientName: PropTypes.string.isRequired,
};

export default AlertBox;
