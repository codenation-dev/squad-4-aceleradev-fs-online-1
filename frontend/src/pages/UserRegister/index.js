import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Container, Form } from './styles';
import logo from '../../assets/logo.svg';

export default class Register extends Component {
  state = {
    name: '',
    username: '',
    email: '',
    password: '',
  };

  render() {
    return (
      <Container>
        <Form>
          <img src={logo} alt="Logo Banco Uati" />
          <input type="text" placeholder="Nome completo" />
          <input type="text" placeholder="Apelido" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Senha" />

          <button type="submit">CADASTRAR</button>
          <div className="register-options">
            <Link to="/user/login">
              <small>Já possui conta? Faça o login!</small>
            </Link>
          </div>
        </Form>
      </Container>
    );
  }
}
