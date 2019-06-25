import React from 'react';
import { shallow } from 'enzyme';
import ChartCards from '../../components/ChartCards';

describe('ChartBox', () => {
  // testa o component puro, sem renderizar os filhos
  it('should render correctly with no props', () => {
    const component = shallow(<ChartCards />);
    expect(component).toMatchSnapshot();
  });

  // testa o component puro, passando as props esperadas
  it('should render with given item', () => {
    const pieData = [
      { name: 'Potenciais clientes', value: 3 },
      { name: 'Clientes remanescentes', value: 12 },
    ];
    const lineData = [
      {
        name: '0-2500',
        Clientes: 1,
      },
      {
        name: '2500-5000',
        Clientes: 1,
      },
    ];
    const COLORS = ['#0088FE', '#FFBB28', '#00C49F', '#FF8042'];
    const item = {
      barTitle: '',
      pieTitle: '',
      pieData,
      lineData,
      renderCustomizedLabel: () => {},
      colors: COLORS,
      loaded: true,
    };
    const component = shallow(<ChartCards {...item} />);
    expect(component).toMatchSnapshot();
  });
});
