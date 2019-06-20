import React from 'react';
import { shallow } from 'enzyme';
import UploadFile from '../pages/UploadFile';

// Testa o component puro, sem redenrizar os filhos
it('renders without crashing', () => {
  const component = shallow(<UploadFile />);

  expect(component).toMatchSnapshot();
});
