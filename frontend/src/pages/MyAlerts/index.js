import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './styles';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import AlertBox from '../../components/AlertBox';
import { MessageComponent } from '../../components/message';

import { getAlertsByUser } from '../../services/alertsServices';
import { getMail } from '../../services/loginService';

export default class MyAlerts extends Component {
  state = {
    alerts: [],
  };

  async componentDidMount() {
    const result = await getAlertsByUser(getMail());

    this.setState({
      alerts: result,
    });
  }

  render() {
    const { alerts } = this.state;
    return (
      <Container>
        <div className="d-flex" id="wrapper">
          <Sidebar />
          <div id="page-content-wrapper">
            <Navbar />
            <div className="container-fluid">
              <div className="card main-content mt-4 p-4 ">
                <div className="row justify-content-between mr-5 ml-5 mb-2">
                  <h3>Meus alertas</h3>
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
                          <Link to="/history/alerts">
                            <button className="navbar-toggler btn btn-dark bg-dark-blue mb-3">
                              <i className="fa fa-history " /> Monitorar alertas
                            </button>
                          </Link>
                        </div>
                        <div className="modal-body">
                          {alerts.length > 0 ? (
                            alerts.map(alert => (
                              <AlertBox
                                key={alert.id}
                                date={alert.send_date.split(' ')[0]}
                                hour={alert.send_date.split(' ')[1]}
                                clientName={alert.client_name}
                                emailDestination={alert.user_email}
                                userDestination={alert.user_name}
                              />
                            ))
                          ) : (
                            <MessageComponent
                              text="Você não possui alertas."
                              classe="empty-alert"
                            />
                          )}
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
