import React from 'react';
import { shallow } from 'enzyme';
import UserLogin from '../pages/UserLogin';

// Testa o component puro, sem redenrizar os filhos
it('renders without crashing', () => {
  const component = shallow(<UserLogin />);

  expect(component).toMatchSnapshot();
});
