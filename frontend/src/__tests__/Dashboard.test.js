import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../pages/Dashboard';

// Testa o component puro, sem redenrizar os filhos
it('renders without crashing', () => {
  const component = shallow(<Dashboard />);

  expect(component).toMatchSnapshot();
});
