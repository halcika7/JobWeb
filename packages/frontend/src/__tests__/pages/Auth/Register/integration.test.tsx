import React from 'react';
import ReduxProvider from '@store/provider';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import Register from '@pages/Auth/Register';
import store from '@store/index';

import { authFailed, authSuccess } from '@pages/Auth/store/actions';
import { HTTPCodes } from '@job/common';

import moxios from 'moxios';
import axios from '@axios';
import sweetAlert from '@components/UI/sweetAlert';
import Alert from '@components/UI/alert';

describe('Testing Register Page', () => {
  let component: ReactWrapper;

  beforeEach(() => {
    moxios.install(axios);
    component = mount(
      <ReduxProvider>
        <Router>
          <Register />
        </Router>
      </ReduxProvider>
    );
  });

  afterEach(() => {
    moxios.uninstall();
    component.unmount();
  });

  it('should close sweet allert after button clicked', async done => {
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
        expect(component.find(sweetAlert).length).toBe(0);
        done();
      }, 100);
    });
  });

  it('should close alert after button clicked', async done => {
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

  it('should auto close alert after 4s', async done => {
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

  it('should close alert on success action after button is clicked', async done => {
    await act(async () => {
      store.dispatch(authSuccess('Invalid username', HTTPCodes.OK));

      setTimeout(() => {
        component.update();
        expect(component.find(sweetAlert).find('button').length).toBe(1);
        component.find(sweetAlert).find('button').simulate('click');
        expect(component.find(sweetAlert).length).toBe(0);
        done();
      }, 100);
    });
  });
});
