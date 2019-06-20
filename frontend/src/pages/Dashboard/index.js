import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import InfoCards from '../../components/InfoCards';
import ChartCards from '../../components/ChartCards';

const lineData = [
  {
    name: '0-2500',
    Clientes: 3,
  },
  {
    name: '2500-5000',
    Clientes: 3,
  },
  {
    name: '5000-7500',
    Clientes: 2,
  },
  {
    name: '7500-10000',
    Clientes: 2,
  },
  {
    name: '10000-12500',
    Clientes: 1,
  },
  {
    name: '12500-15000',
    Clientes: 1,
  },
  {
    name: '15000-20000',
    Clientes: 2,
  },
  {
    name: '20000+',
    Clientes: 3,
  },
];

const pieData = [
  { name: 'Potenciais clientes', value: 400 },
  { name: 'Clientes remanescentes', value: 300 },
];

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
    dataDidLoaded: true,
  };

  render() {
    const { dataDidLoaded } = this.state;
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
                    value={35}
                    type="fa fa-bell fa-lg"
                    loaded={dataDidLoaded}
                  />
                  <InfoCards
                    cardTitle="Emails enviados"
                    value={35}
                    type="fa fa-envelope fa-lg"
                    loaded={dataDidLoaded}
                  />
                  <InfoCards
                    cardTitle="Clientes analisados"
                    value={100}
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
