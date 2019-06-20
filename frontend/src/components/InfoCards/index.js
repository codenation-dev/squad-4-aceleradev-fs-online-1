import React from 'react';
import CountUp from 'react-countup';
import PropTypes from 'prop-types';

import { Container } from './styles';

const InfoCards = ({
  cardTitle, value, type, loaded,
}) => (
  <div className="card  text-white bg-dark-blue mb-3 col-sm-3 ">
    <div className="card-header text-center">
      {' '}
      <h5 className="card-title">{cardTitle}</h5>
    </div>
    <Container>
      <div className="card-body">
        {loaded ? (
          <div className="card-text">
            <div className="numbers">
              <i className={type} />
              <CountUp end={value} duration={5} />
            </div>
          </div>
        ) : (
          <div className="card-text">
            <div className="numbers">
              <p className="no-results">Sem resultados</p>
            </div>
          </div>
        )}
      </div>
      <div className="card-footer">
        <p>
          <i className="fa fa-clock-o mr-2" />
          Até a última importação
        </p>
      </div>
    </Container>
  </div>
);

InfoCards.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  loaded: PropTypes.bool.isRequired,
};

export default InfoCards;
