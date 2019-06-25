import React from 'react';
import { shallow } from 'enzyme';
import Message from '../../components/message';

describe('Message', () => {
  // testa o component puro, sem renderizar os filhos
  it('should render correctly with no props', () => {
    const component = shallow(<Message />);
    expect(component).toMatchSnapshot();
  });

  // testa o component puro, passando as props esperadas
  it('should render with given item', () => {
    const item = {
      classe: 'classe',
      text: 'text',
    };
    const component = shallow(<Message {...item} />);
    expect(component).toMatchSnapshot();
  });
});
