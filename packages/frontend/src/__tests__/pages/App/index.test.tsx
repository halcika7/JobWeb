import React from 'react';
import App from '@pages/App';
import { BrowserRouter as Router } from 'react-router-dom';
import ReduxProvider from '@store/provider';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from '@components/ErrorBoundary/index';
import Nav from '@components/navbar';
import Brand from '@components/navbar/Brand';

import { mount } from 'enzyme';
import navbar from '@components/navbar';

describe('Testing App component', () => {
  it('should render', () => {
    window.scroll = jest.fn();
    const comp = mount(
      <HelmetProvider>
        <ReduxProvider>
          <Router>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </Router>
        </ReduxProvider>
      </HelmetProvider>
    );

    expect(comp.find(navbar).length).toBe(1);
    comp.find(Nav).find(Brand).find('button').at(0).simulate('click');
    comp.find(Nav).find(Brand).find('button').at(0).simulate('click');
    comp.unmount();
  });

  it('should catch error', () => {
    window.scroll = jest.fn();
    const comp = mount(
      <HelmetProvider>
        <ReduxProvider>
          <Router>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </Router>
        </ReduxProvider>
      </HelmetProvider>
    );

    const error = new Error('test');

    comp.find(App).simulateError(error);

    comp.update();
    expect(comp.find('h1').at(0).text()).toBe('Error: test');
    comp.unmount();
  });
});
