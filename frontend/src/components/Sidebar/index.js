import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';
import logo from '../../assets/logo190x33.svg';

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
            <i className="fa fa-user-circle fa-lg" /> Olá, Henrique
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
            <i className="fa fa-history fa-lg" /> Histórico{' '}
            <i className="float-right fa fa-caret-down" />
          </li>
          <div className="collapse" id="navbarToggleExternalContent">
            <div className="bg-dark-blue">
              <ul>
                <li className="list-group-item list-group-item-action bg-dark-blue">
                  <i className="fa fa-envelope fa-lg" /> Emails
                </li>
                <li className="list-group-item list-group-item-action bg-dark-blue">
                  <i className="fa fa-bell fa-lg" /> Alertas
                </li>
              </ul>
            </div>
          </div>
          <Link to="/upload">
            <li className="list-group-item list-group-item-action bg-dark-blue">
              <i className="fa fa-upload" /> Importar arquivo
            </li>
          </Link>

          <li className="list-group-item list-group-item-action bg-dark-blue">
            <i className="fa fa-sign-out fa-lg" /> Sair
          </li>
        </ul>
      </div>
    </div>
  </Container>
);

export default Sidebar;
