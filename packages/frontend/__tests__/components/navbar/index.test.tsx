import React from 'react';
import { mount } from 'enzyme';
import Nav from '@components/navbar';
import Brand from '@components/navbar/Brand';
import ThemeProvider from '@styled/Providers';

import ReduxProvider from '../../__mocks__/provider';

describe('Testing navbar index', () => {
  it('should render component', () => {
    const comp = mount(
      <ReduxProvider>
        <ThemeProvider>
          <Nav isServerAuth />
        </ThemeProvider>
      </ReduxProvider>
    );

    comp.find(Brand).find('button').at(0).simulate('click');
    comp.find(Brand).find('button').at(1).simulate('click');
    comp.find(Brand).find('button').at(1).simulate('click');

    comp.unmount();
  });
});
