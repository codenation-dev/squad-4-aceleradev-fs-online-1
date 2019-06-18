import React from 'react';

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
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/user/login">
                Sair
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </Container>
);

export default Navbar;
