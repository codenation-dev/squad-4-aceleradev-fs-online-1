import React, { Component } from 'react';

import { Container } from './styles';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { getUsers, updateReceiveAlert } from '../../services/userService';
import MessageComponent from '../../components/message/index'

export default class Administrative extends Component {
  state = {
    checkedItems: new Map(),
    users: [],
    message: '',
    messageClass: 'hidden',
  };

  componentDidMount() {
    getUsers().then((response) => {
      this.setState({ users: response.data });
      response.data.map((user) => {
          this.setState(prevState => ({
            checkedItems: prevState.checkedItems.set(
              user.username, user.receive_alert,
            ),
          }));
      });
    }).catch((error) => {
      this.setState({ message: 'Erro ao buscar os usuários', messageClass: 'error-message' });
    });
  }

  handleChange = (e) => {
    const item = e.target.value;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked ? 1 : 0),
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let users = [];
    const { checkedItems } = this.state;
    for (const entry of checkedItems.entries()) {
      let user = {username: entry[0], receive_alert: entry[1]}
      users.push(user)
    }
    updateReceiveAlert(users).then((response) => {
      this.setState({ message: 'Atualização realizada com sucesso', messageClass: 'success-message'});
    }).catch((error) => {
      this.setState({ message: 'Ocorreu um erro ao atualizar os usuários', messageClass: 'error-message' });
    });
  };

  

  render() {
    const { users } = this.state;

    return (
      <Container>
        <div className="d-flex" id="wrapper">
          <Sidebar />
          <div id="page-content-wrapper">
            <Navbar />
            <div className="container-fluid">
              <div className="card main-content mt-4 p-4 ">
              <MessageComponent text = {this.state.message} classe = {this.state.messageClass}/>
              <br/>
                <div className="row justify-content-between mr-5 ml-5 mb-2">
                  <h3>Gerenciar alertas</h3>
                </div>
                <div className="row justify-content-between ">
                  <div
                    className="modal fade show"
                    id="exampleModalScrollable"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalScrollableTitle"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5>Selecione os usuários que serão notificados:</h5>
                        </div>
                        <div className="modal-body">
                          <ul className="user-list ">
                            {users.map(user => (
                              <li key={user.username}>
                                <div className="form-check">
                                  <input
                                    onChange={this.handleChange}
                                    checked={this.state.checkedItems.get(user.username)}
                                    className="form-check-input"
                                    type="checkbox"
                                    value={user.username}
                                    id="defaultCheck1"
                                  />
                                  <label className="form-check-label" htmlFor="defaultCheck1">
                                    <b>{user.nome}</b> ({user.email})
                                  </label>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="modal-header justify-content-center">
                          <button
                            onClick={this.handleSubmit}
                            className="btn btn-dark bg-dark-blue mb-3"
                          >
                            <i className="fa fa-save" /> Salvar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
