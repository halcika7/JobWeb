import React from 'react';
import ReduxProvider from '@store/provider';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import Login from '@pages/Auth/Login';
import store from '@store/index';

import { authFailed } from '@pages/Auth/store/actions';
import { HTTPCodes } from '@job/common';

import sweetAlert from '@components/UI/sweetAlert';
import Alert from '@components/UI/alert';

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

  it('should close sweet alert', async done => {
    await act(async () => {
      store.dispatch(
        authFailed({
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
        authFailed({
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
        authFailed({
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
