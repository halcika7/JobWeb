import React from 'react';
import { mount } from 'enzyme';
import Brand from '@components/navbar/Brand';
import ThemeProvider from '@styled/Providers';

import ReduxProvider from '../../__mocks__/provider';

describe('Testing Brand component', () => {
  let toggled = false;
  const toggleNav = () => {
    toggled = !toggled;
  };

  it('shoulld render component', () => {
    const comp = mount(
      <ReduxProvider>
        <ThemeProvider>
          <Brand toggled={toggled} toggleNav={toggleNav} />
        </ThemeProvider>
      </ReduxProvider>
    );

    comp.find('button').at(0).simulate('click');

    comp.unmount();
  });
});
