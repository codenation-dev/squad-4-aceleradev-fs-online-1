import React from 'react';
import { logout, getUser } from '../../services/loginService';

import { Container } from './styles';

const Navbar = () => (
  <Container>
    <nav className="navbar navbar-expand-lg  border-bottom">
      <div className="toggle-btn">
        <i className="fa fa-bars fa-lg" id="menu-toggle" />
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle text-white"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-user-circle fa-lg text-white" /> {getUser()}
            </a>
            <div
              className="dropdown-menu dropdown-menu-right bg-dark-blue"
              aria-labelledby="navbarDropdown"
            >
              <a className="dropdown-item bg-dark-blue text-white" href="/user/login" onClick={logout}>
                <i className="fa fa-sign-out fa-lg" /> Sair
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </Container>
);

export default Navbar;
