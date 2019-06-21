import React, { Component } from 'react';

import { Container } from './styles';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

export default class Administrative extends Component {
  state = {
    checkedItems: new Map(),
  };

  handleChange = (e) => {
    const item = e.target.value;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <Container>
        <div className="d-flex" id="wrapper">
          <Sidebar />
          <div id="page-content-wrapper">
            <Navbar />
            <div className="container-fluid">
              <div className="card main-content mt-4 p-4 ">
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
                          <label className="sr-only" htmlFor="inlineFormInputGroup">
                            Pesquisar
                          </label>
                          <div className="input-group ">
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <i className="fa fa-search" />
                              </div>
                            </div>
                            <input
                              type="search"
                              className="form-control"
                              id="inlineFormInputGroup"
                              placeholder="Pesquisar"
                            />
                          </div>
                          <ul className="user-list ">
                            <li>
                              <div className="form-check">
                                <input
                                  onChange={this.handleChange}
                                  checked={this.state.checkedItems.get('hick_97@hotmail.com')}
                                  className="form-check-input"
                                  type="checkbox"
                                  value="hick_97@hotmail.com"
                                  id="defaultCheck1"
                                />
                                <label className="form-check-label" htmlFor="defaultCheck1">
                                  <b>Henrique Augusto</b> (hick_97@hotmail.com)
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className="form-check">
                                <input
                                  onChange={this.handleChange}
                                  checked={this.state.checkedItems.get('hick_g@hotmail.com')}
                                  className="form-check-input"
                                  type="checkbox"
                                  value="hick_g@hotmail.com"
                                  id="defaultCheck1"
                                />
                                <label className="form-check-label" htmlFor="defaultCheck1">
                                  <b>Henrique Augusto</b> (hick_97@hotmail.com)
                                </label>
                              </div>
                            </li>
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
