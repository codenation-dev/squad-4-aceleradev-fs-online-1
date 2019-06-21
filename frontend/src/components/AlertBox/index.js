import React from 'react';

import { AlertContainer } from './styles';

const AlertBox = () => (
  <AlertContainer>
    <div className=" alert alert-primary" role="alert">
      Novo alerta emitido para <b>Francisco</b>. <b>Henrique Augusto</b> é um potencial cliente!
      <div className="collapse" id="alert1">
        <ul>
          <li className="list-group-item list-group-item-action ">
            <i className="fa fa-calendar-o" /> <b>Data:</b> 01/10/2019
          </li>
          <li className="list-group-item list-group-item-action ">
            <i className="fa fa-clock-o" /> <b>Hora:</b> 10:28:34
          </li>
          <li className="list-group-item list-group-item-action ">
            <i className="fa fa-user" /> <b>Alerta emitido para:</b> Henrique Augusto
          </li>
          <li className="list-group-item list-group-item-action ">
            <i className="fa fa-at" /> <b>Email do usuário:</b> hick_97@hotmail.com
          </li>
        </ul>
      </div>
    </div>
  </AlertContainer>
);

export default AlertBox;
