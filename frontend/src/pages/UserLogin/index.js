/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Container, Form } from './styles';
import logo from '../../assets/logo.svg';
import { doLogin, isLogged } from '../../services/loginService';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    message: '',
  };

  componentDidMount() {
    if (isLogged()) {
      this.props.history.push('/');
    }
  }

  handleEmailChange = (e) => {
    const { target } = e;
    const { value } = target;

    this.setState({
      email: value,
    });
  };

  handlePasswordChange = (e) => {
    const { target } = e;
    const { value } = target;

    this.setState({
      password: value,
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    doLogin(email, password).then((response) => {
      this.props.history.push('/');
    }).catch((error) => {
      this.setState({ email: '', password: '', message: 'Invalid Email/Password' });
    });
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleLogin}>
          <img src={logo} alt="Logo Banco Uati" />
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            placeholder="Senha"
          />

          <span>{this.state.message}</span>
          <button type="submit">Entrar</button>
          <div className="login-options">
            <Link to="/user/register">
              <small>Não possui conta? Crie uma agora!</small>
            </Link>
          </div>
        </Form>
      </Container>
    );
  }
}
