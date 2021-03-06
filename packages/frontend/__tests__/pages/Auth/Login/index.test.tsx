import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import Login from '@containers/Auth/Login';
import Breadcrumb from '@components/UI/breadcrumb';
import LoginFormik from '@containers/Auth/Login/LoginFormik';
import LoginSocial from '@containers/Auth/Login/LoginSocial';
import sweetAlert from '@components/UI/sweetAlert';
import Alert from '@components/UI/alert';
import { store, Actions } from '@job/redux';

import { HTTPCodes } from '@job/common';

import ReduxProvider from '../../../__mocks__/provider';

import ThemeProvider from 'styled/Providers';

describe('Testing Login Page', () => {
  let component: ReactWrapper;

  beforeEach(() => {
    component = mount(
      <ReduxProvider>
        <ThemeProvider>
          <Login />
        </ThemeProvider>
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
      Actions.authFailed({
        status: HTTPCodes.BAD_REQUEST,
        message: 'Invalid username',
      })
    );

    component.update();

    expect(component.find(LoginFormik).prop('status')).toBe(
      HTTPCodes.BAD_REQUEST
    );
  });

  test('should simulate autoclosing alert after limit', async done => {
    await act(async () => {
      store.dispatch(
        Actions.authFailed({
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

  it('should close sweet alert', async done => {
    await act(async () => {
      store.dispatch(
        Actions.authFailed({
          status: HTTPCodes.BAD_REQUEST,
          message: 'Invalid username',
        })
      );

      setTimeout(() => {
        component.update();
        expect(component.find(sweetAlert).find('button').length).toBe(1);
        component.find(sweetAlert).find('button').simulate('click');
        done();
      }, 100);
    });
  });

  it('should close alert', async done => {
    await act(async () => {
      store.dispatch(
        Actions.authFailed({
          status: HTTPCodes.TOO_MANY_REQUESTS,
          message: 'Invalid username',
        })
      );

      setTimeout(() => {
        component.update();
        expect(component.find(Alert).find('button').length).toBe(1);
        component.find(Alert).find('button').simulate('click');
        done();
      }, 100);
    });
  });

  it('should close alert after 4s', async done => {
    await act(async () => {
      store.dispatch(
        Actions.authFailed({
          status: HTTPCodes.TOO_MANY_REQUESTS,
          message: 'Invalid username',
        })
      );

      await new Promise(resolve => {
        setTimeout(() => {
          component.update();
          resolve(expect(component.find(Alert).find('button').length).toBe(0));
          done();
        }, 2100);
      });
    });
  });
});
