import React from 'react';
import App from '@pages/App';
import { BrowserRouter as Router } from 'react-router-dom';
import ReduxProvider from '@store/provider';
import { HelmetProvider } from 'react-helmet-async';

import { mount } from 'enzyme';
import navbar from '@components/navbar';

describe('Testing App component', () => {
  it('should render', () => {
    window.scroll = jest.fn();
    const comp = mount(
      <HelmetProvider>
        <ReduxProvider>
          <Router>
            <App />
          </Router>
        </ReduxProvider>
      </HelmetProvider>
    );

    expect(comp.find(navbar).length).toBe(1);
    comp.unmount();
  });
});
