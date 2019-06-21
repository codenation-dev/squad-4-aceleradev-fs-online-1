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
    register(username, name, email, password).then((response) => {
      this.props.history.push('/user/login');
    }).catch((error) => {
      alert('Ocorreu um erro ao cadastrar o usuário');
    });
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
          />
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Apelido"
            onChange={this.handleInputChange}
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Senha"
            onChange={this.handleInputChange}
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
