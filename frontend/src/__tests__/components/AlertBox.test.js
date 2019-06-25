import React from 'react';
import { shallow } from 'enzyme';
import AlertBox from '../../components/AlertBox';

describe('AlertBox', () => {
  // testa o component puro, sem renderizar os filhos
  it('should render correctly with no props', () => {
    const component = shallow(<AlertBox />);
    expect(component).toMatchSnapshot();
  });

  // testa o component puro, passando as props esperadas
  it('should render with given item', () => {
    const item = {
      date: '22-12-2018',
      hour: '21:53:13',
      userDestination: 'Henrique Augusto',
      emailDestination: 'hick_97@hotmail.com',
      clientName: 'MARLENE DE QUINTANILHA MARTINS',
    };
    const component = shallow(<AlertBox {...item} />);
    expect(component).toMatchSnapshot();
  });
});
