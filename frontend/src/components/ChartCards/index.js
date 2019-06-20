import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const ChartCards = ({
  barTitle,
  pieTitle,
  pieData,
  barsData,
  renderCustomizedLabel,
  colors,
  loaded,
}) => (
  <div className="analitycs-cards row mt-3 mb-3">
    <div className="card  text-white bg-dark-blue mb-3 text-center col-sm-5 ">
      <div className="card-header">
        <h5 className="card-title">{pieTitle}</h5>
      </div>
      <div className="card-body chart-card-content justify-content-center">
        {loaded ? (
          <ResponsiveContainer>
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                cx={250}
                cy={120}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="justify-content-center">
            <h1>Sem resultados</h1>
            <span>Importe um arquivo .csv para que a análise dos dados possam ser feitas.</span>
            <Link to="/upload">
              <button className="btn btn-dark bg-light text-dark mt-4">
                <i className="fa fa-upload" /> Importar arquivo
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
    <div className="card  text-white bg-dark-blue mb-3 text-center col-sm-5 ">
      <div className="card-header">
        <h5 className="card-title">{barTitle}</h5>
      </div>
      <div className="card-body">
        {loaded ? (
          <ResponsiveContainer>
            <BarChart
              width={500}
              height={300}
              data={barsData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="justify-content-center">
            <h1>Sem resultados</h1>
            <span>Importe um arquivo .csv para que a análise dos dados possam ser feitas.</span>
            <Link to="/upload">
              <button className="btn btn-dark bg-light text-dark mt-4">
                <i className="fa fa-upload" /> Importar arquivo
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
);

ChartCards.propTypes = {
  barTitle: PropTypes.string.isRequired,
  pieTitle: PropTypes.string.isRequired,
  pieData: PropTypes.array.isRequired,
  barsData: PropTypes.array.isRequired,
  renderCustomizedLabel: PropTypes.func.isRequired,
  colors: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
};

export default ChartCards;
