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
    isAdmin: false,
  };

  handleInputChange = (e) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      name, username, email, password, isAdmin,
    } = this.state;
    return (
      <Container>
        <Form>
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
          <div className="form-group form-check">
            <input
              value={isAdmin}
              name="isAdmin"
              onChange={this.handleInputChange}
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Criar conta de administrador
            </label>
          </div>

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
