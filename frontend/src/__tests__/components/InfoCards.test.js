import React from 'react';
import { shallow } from 'enzyme';
import InfoCards from '../../components/InfoCards';

describe('InfoCards', () => {
  // testa o component puro, sem renderizar os filhos
  it('should render correctly with no props', () => {
    const component = shallow(<InfoCards />);
    expect(component).toMatchSnapshot();
  });

  // testa o component puro, passando as props esperadas
  it('should render with given item', () => {
    const item = {
      cardTitle: 'title',
      type: '',
      value: 4,
      loaded: true,
    };
    const component = shallow(<InfoCards {...item} />);
    expect(component).toMatchSnapshot();
  });
});
