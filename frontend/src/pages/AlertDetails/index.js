import React, { Component } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import AlertBox from "../../components/AlertBox";
import alertsService from "../../services/alertsService";

import { Container } from "./styles";

export default class AlertDetails extends Component {
  state = {
    alerts: [],
    filteredAlerts: []
  };

  async componentDidMount() {
    const result = await alertsService.getHistory();

    this.setState({
      alerts: result.data,
      filteredAlerts: result.data
    });
  }

  handleFilter = async keySearch => {
    const result = await this.filterAlerts(keySearch);

    this.setState({
      filteredAlerts: result
    });
  };

  filterAlerts = keySearch => {
    const { alerts } = this.state;
    const ks = keySearch.toLowerCase();

    const result = alerts.filter(item => {
      const { client_name, user_name, user_email } = item;
      return (
        client_name.toLowerCase().search(ks) !== -1 ||
        user_name.toLowerCase().search(ks) !== -1 ||
        user_email.toLowerCase().search(ks) !== -1
      );
    });

    return result;
  };

  render() {
    const { filteredAlerts } = this.state;
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
                    <div
                      className="modal-dialog modal-dialog-scrollable"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <label
                            className="sr-only"
                            htmlFor="inlineFormInputGroup"
                          >
                            Pesquisar
                          </label>
                          <div className="input-group ">
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <i className="fa fa-search" />
                              </div>
                            </div>
                            <input
                              onChange={e => this.handleFilter(e.target.value)}
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

                          {filteredAlerts.length > 0
                            ? filteredAlerts.map(alert => (
                                <AlertBox
                                  key={alert.id}
                                  date={alert.send_date.split(" ")[0]}
                                  hour={alert.send_date.split(" ")[1]}
                                  clientName={alert.client_name}
                                  emailDestination={alert.user_email}
                                  userDestination={alert.user_name}
                                />
                              ))
                            : null}
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
