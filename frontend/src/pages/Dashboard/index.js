import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import InfoCards from '../../components/InfoCards';
import ChartCards from '../../components/ChartCards';

const barsData = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
                  pieTitle="Título 1"
                  barTitle="Título 2"
                  pieData={pieData}
                  barsData={barsData}
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
