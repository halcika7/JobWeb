import React from 'react';
import { mount } from 'enzyme';
import Nav from '@components/navbar';
import Brand from '@components/navbar/Brand';

import { BrowserRouter as Router } from 'react-router-dom';
import ReduxProvider from '@store/provider';
import { CookiesProvider } from 'react-cookie';

describe('Testing navbar index', () => {
  it('shoulld render component', () => {
    const comp = mount(
      <ReduxProvider>
        <CookiesProvider>
          <Router>
            <Nav />
          </Router>
        </CookiesProvider>
      </ReduxProvider>
    );

    comp.find(Brand).find('button').at(0).simulate('click');
    comp.find(Brand).find('button').at(1).simulate('click');
    comp.find(Brand).find('button').at(1).simulate('click');

    comp.simulate('scroll', { top: 400, left: 0 });

    comp.update();

    comp.simulate('scroll', { top: 0, left: 0 });

    comp.unmount();
  });
});
