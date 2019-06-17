import React from 'react';
import { shallow } from 'enzyme';
import UserRegister from './index';

// Testa o component puro, sem redenrizar os filhos
it('renders without crashing', () => {
  const component = shallow(<UserRegister />);

  expect(component).toMatchSnapshot();
});
