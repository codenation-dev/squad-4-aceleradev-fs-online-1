import React from 'react';
import { shallow } from 'enzyme';
import MyAlerts from '../pages/MyAlerts';

// Testa o component puro, sem redenrizar os filhos
it('renders without crashing', () => {
  const component = shallow(<MyAlerts />);

  expect(component).toMatchSnapshot();
});
