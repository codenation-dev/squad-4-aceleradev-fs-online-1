import React from 'react';
import { shallow } from 'enzyme';
import Administrative from '../../pages/Administrative';

// Testa o component puro, sem redenrizar os filhos
it('renders without crashing', () => {
  const component = shallow(<Administrative />);

  expect(component).toMatchSnapshot();
});
