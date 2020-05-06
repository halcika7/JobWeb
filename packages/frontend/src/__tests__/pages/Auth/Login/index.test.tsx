import React from 'react';
import ReduxProvider from '@store/provider';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import Login from '@pages/Auth/Login';
import Breadcrumb from '@components/UI/breadcrumb';
import LoginFormik from '@pages/Auth/Login/LoginFormik';
import LoginSocial from '@pages/Auth/Login/LoginSocial';
import store from '@store/index';

import { authFailed } from '@pages/Auth/store/actions';
import { HTTPCodes } from '@job/common';

describe('Testing Login Page', () => {
  let component: ReactWrapper;

  beforeEach(() => {
    component = mount(
      <ReduxProvider>
        <Router>
          <Login />
        </Router>
      </ReduxProvider>
    );
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render each component', () => {
    expect(component.find(Breadcrumb).length).toBe(1);
    expect(component.find(LoginFormik).length).toBe(1);
    expect(component.find(LoginSocial).length).toBe(1);
    expect(component.find('h1').length).toBe(1);
  });

  it('should update status to 400', async () => {
    store.dispatch(
      authFailed({
        status: HTTPCodes.BAD_REQUEST,
        message: 'Invalid username',
      })
    );

    component.update();

    expect(component.find(LoginFormik).prop('status')).toBe(HTTPCodes.BAD_REQUEST);
  });

  test('should simulate autoclosing alert after limit', async (done) => {
    await act(async () => {
      store.dispatch(
        authFailed({
          status: HTTPCodes.TOO_MANY_REQUESTS,
          message: 'Invalid username',
        })
      );

      component.update();

      await new Promise(resolve => {
        setTimeout(() => {
          resolve(
            expect(component.find(LoginFormik).prop('status')).toBe(null)
          );
          done();
        }, 2100);
      });
    });
  });
});
