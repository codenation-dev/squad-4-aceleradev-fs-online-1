import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from '../../components/Sidebar';

describe('Sidebar', () => {
  // testa o component puro, sem renderizar os filhos
  it('should render correctly with no props', () => {
    const component = shallow(<Sidebar />);
    expect(component).toMatchSnapshot();
  });
});
