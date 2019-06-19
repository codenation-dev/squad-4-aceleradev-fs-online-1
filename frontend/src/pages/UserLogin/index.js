import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Container, Form } from './styles';
import logo from '../../assets/logo.svg';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleInputChange = (e) => {
    const { target } = e;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Container>
        <Form>
          <img src={logo} alt="Logo Banco Uati" />
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleInputChange}
            placeholder="Senha"
          />

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
