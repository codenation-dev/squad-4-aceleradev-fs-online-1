import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../services/loginService';

import { Container, Form } from './styles';
import logo from '../../assets/logo.svg';

export default class Register extends Component {
  state = {
    name: '',
    username: '',
    email: '',
    password: '',
  };

  handleInputChange = (e) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  handleRegister = (e) => {
    e.preventDefault();
    const {
      username, name, email, password,
    } = this.state;
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");

    if (strongRegex.test(password)){
      register(username, name, email, password).then((response) => {
        this.props.history.push('/user/login');
      }).catch((error) => {
        alert('Ocorreu um erro ao cadastrar o usuário');
      });
    } else {
      alert('Sua senha deve ter ao menos um caracter maiúsculo, um caracter minúsculo, um número, um caracter especial e 6 caracteres.');
    }
  }

  render() {
    const {
      name, username, email, password,
    } = this.state;
    return (
      <Container>
        <Form onSubmit={this.handleRegister}>
          <img src={logo} alt="Logo Banco Uati" />
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Nome completo"
            onChange={this.handleInputChange}
            required
          />
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Apelido"
            onChange={this.handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Senha"
            onChange={this.handleInputChange}
            required
          />

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