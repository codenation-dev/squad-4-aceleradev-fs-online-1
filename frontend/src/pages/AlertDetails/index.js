import React, { Component } from 'react';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import AlertBox from '../../components/AlertBox';

import { Container } from './styles';

export default class AlertDetails extends Component {
  state = {};

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
                  <h3>Histórico de alertas</h3>
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
                        </div>
                        <div className="modal-body">
                          <button
                            className="navbar-toggler btn btn-dark bg-dark-blue mb-3"
                            data-toggle="collapse"
                            data-target="#alert1"
                            aria-controls="alert1"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                          >
                            <i className="fa fa-plus " /> Mostrar detalhes
                          </button>

                          <AlertBox />
                          <AlertBox />
                          <AlertBox />
                          <AlertBox />
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
