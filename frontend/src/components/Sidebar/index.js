import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';
import logo from '../../assets/logo190x33.svg';
import { logout, getUser } from '../../services/loginService';

const Sidebar = () => (
  <Container>
    <div className="border-right" id="sidebar-wrapper">
      <div className="sidebar-heading">
        {' '}
        <img src={logo} alt="Logo Banco Uati" />
      </div>
      <div className="list-group list-group-flush">
        <ul>
          <li className="greeting-item list-group-item list-group-item-action bg-dark-blue">
            <i className="fa fa-user-circle fa-lg" /> Olá, {getUser()}
          </li>
          <Link to="/">
            <li className="list-group-item list-group-item-action bg-dark-blue">
              <i className="fa fa-bar-chart fa-lg" /> Dashboard
            </li>
          </Link>

          <li
            className=" navbar-toggler list-group-item list-group-item-action bg-dark-blue"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {' '}
            <i className="fa fa-bell fa-lg" /> Alertas{' '}
            <i className="float-right fa fa-caret-down" />
          </li>
          <div className="collapse" id="navbarToggleExternalContent">
            <div className="bg-dark-blue">
              <ul>
                <Link to="/alerts">
                  <li className="list-group-item list-group-item-action bg-dark-blue">
                    <i className="fa fa-exclamation-circle fa-lg" /> Meus alertas
                  </li>
                </Link>

                <Link to="/history/alerts">
                  <li className="list-group-item list-group-item-action bg-dark-blue">
                    <i className="fa fa-history fa-lg" /> Histórico
                  </li>
                </Link>
              </ul>
            </div>
          </div>
          <Link to="/upload">
            <li className="list-group-item list-group-item-action bg-dark-blue">
              <i className="fa fa-upload" /> Importar arquivo
            </li>
          </Link>
          <Link to="/user/administrative">
            <li className="list-group-item list-group-item-action bg-dark-blue">
              <i className="fa fa-lock fa-lg" /> Administrativo
            </li>
          </Link>
          <Link to="/user/login" onClick={logout}>
            <li className="list-group-item list-group-item-action bg-dark-blue">
              <i className="fa fa-sign-out fa-lg" /> Sair
            </li>
          </Link>
        </ul>
      </div>
    </div>
  </Container>
);

export default Sidebar;
