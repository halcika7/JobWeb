import React from 'react';
import Contact from '@pages/Contact';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import ReduxProvider from '@store/provider';

describe('Testing Contact component', () => {
  it('should render', () => {
    const component = mount(
      <ReduxProvider>
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      </ReduxProvider>
    );

    expect(component).toBeTruthy();
    component.unmount();
  });
});
