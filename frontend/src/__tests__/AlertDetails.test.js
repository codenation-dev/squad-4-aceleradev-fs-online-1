import React from 'react';
import { shallow } from 'enzyme';
import AlertDetails from '../pages/AlertDetails';

// Testa o component puro, sem redenrizar os filhos
it('renders without crashing', () => {
  const component = shallow(<AlertDetails />);

  expect(component).toMatchSnapshot();
});
