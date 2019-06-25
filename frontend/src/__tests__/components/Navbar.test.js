import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../../components/Navbar';

describe('Navbar', () => {
  // testa o component puro, sem renderizar os filhos
  it('should render correctly with no props', () => {
    const component = shallow(<Navbar />);
    expect(component).toMatchSnapshot();
  });
});
