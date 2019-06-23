import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import InfoCards from '../../components/InfoCards';
import ChartCards from '../../components/ChartCards';
import { countAlerts, countServants, countClients, getSalaryChart } from '../../services/dashboardService'

const COLORS = ['#0088FE', '#FFBB28', '#00C49F', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class Dashboard extends Component {
  state = {
    dataDidLoaded: false,
    alerts_number: 0,
    servants_number: 0,
    clients_number: 0,
    salary_chart_data: new Map()
  };

  componentDidMount() {
    countAlerts().then(response => {
      this.setState({alerts_number: response.data});
    });
    countServants().then(response => {
      this.setState({servants_number: response.data});
    });
    countClients().then(response => {
      this.setState({clients_number: response.data});
    });
    getSalaryChart().then(response => {
      response.data.map((data) => {
        this.state.salary_chart_data.set(data.faixa, data.count)
      });
      this.setState({dataDidLoaded: true})
    }).catch((error) => {
      console.log(error)
    });
  }

  render() {
    const { dataDidLoaded } = this.state;

    const pieData = [
      { name: 'Potenciais clientes', value: this.state.servants_number },
      { name: 'Clientes remanescentes', value: this.state.clients_number },
    ];

    const lineData = [
      {
        name: '0-2500',
        Clientes: this.state.salary_chart_data.get('2500'),
      },
      {
        name: '2500-5000',
        Clientes: this.state.salary_chart_data.get('5000'),
      },
      {
        name: '5000-7500',
        Clientes: this.state.salary_chart_data.get('7500'),
      },
      {
        name: '7500-10000',
        Clientes: this.state.salary_chart_data.get('10000'),
      },
      {
        name: '10000-12500',
        Clientes: this.state.salary_chart_data.get('12500'),
      },
      {
        name: '12500-15000',
        Clientes: this.state.salary_chart_data.get('15000'),
      },
      {
        name: '15000-20000',
        Clientes: this.state.salary_chart_data.get('20000'),
      },
      {
        name: '20000+',
        Clientes: this.state.salary_chart_data.get('20001'),
      },
    ];
    

    return (
      <Container>
        <div className="d-flex" id="wrapper">
          <Sidebar />
          <div id="page-content-wrapper">
            <Navbar />
            <div className="container-fluid">
              <div className="card mt-4 p-4 ">
                <div className="row justify-content-between mr-5 ml-5">
                  <h3>Dashboard</h3>
                  <Link to="/upload">
                    <button className="btn btn-dark bg-dark-blue float-right">
                      <i className="fa fa-upload" /> Importar arquivo
                    </button>
                  </Link>
                </div>
                <div className="analitycs-cards row mt-4 mb-4">
                  <InfoCards
                    cardTitle="Número de alertas"
                    value={this.state.alerts_number}
                    type="fa fa-bell fa-lg"
                    loaded={dataDidLoaded}
                  />
                  <InfoCards
                    cardTitle="Clientes Potenciais"
                    value={this.state.servants_number}
                    type="fa fa-group fa-lg"
                    loaded={dataDidLoaded}
                  />
                  <InfoCards
                    cardTitle="Clientes analisados"
                    value={this.state.clients_number}
                    type="fa fa-line-chart fa-lg"
                    loaded={dataDidLoaded}
                  />
                </div>
                <ChartCards
                  pieTitle="Distribuição geral de potenciais clientes"
                  barTitle="Faixa salarial (Salário x Clientes)"
                  pieData={pieData}
                  lineData={lineData}
                  renderCustomizedLabel={renderCustomizedLabel}
                  colors={COLORS}
                  loaded={dataDidLoaded}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
export default Dashboard;
