import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Container, Form } from './styles';
import logo from '../../assets/logo.svg';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  render() {
    return (
      <Container>
        <Form>
          <img src={logo} alt="Logo Banco Uati" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Senha" />

          <button type="submit">CRIAR</button>
          <div className="login-options">
            <Link to="/user/register">
              <small>Não possui conta? Crie uma agora!</small>
            </Link>
            <Link to="/">
              <small>Esqueceu sua senha?</small>
            </Link>
          </div>
        </Form>
      </Container>
    );
  }
}
