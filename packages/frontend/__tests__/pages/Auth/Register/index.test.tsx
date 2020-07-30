import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import Register from '@containers/Auth/Register';
import Breadcrumb from '@components/UI/breadcrumb';
import RegisterFormik from '@containers/Auth/Register/RegisterFormik';
import RegisterAccount from '@containers/Auth/Register/RegisterAccount';
import sweetAlert from '@components/UI/sweetAlert';
import Alert from '@components/UI/alert';
import { store, axios, Actions } from '@job/redux';

import { act } from 'react-dom/test-utils';

import { HTTPCodes } from '@job/common';

import moxios from 'moxios';

import ReduxProvider from '../../../__mocks__/provider';

import ThemeProvider from 'styled/Providers';

describe('Testing Register Page', () => {
  let component: ReactWrapper;

  beforeAll(() => {
    moxios.install(axios);
    component = mount(
      <ReduxProvider>
        <ThemeProvider>
          <Register />
        </ThemeProvider>
      </ReduxProvider>
    );
  });

  afterAll(() => {
    moxios.uninstall();
    component.unmount();
  });

  it('should render each component', () => {
    expect(component.find(Breadcrumb).length).toBe(1);
    expect(component.find(RegisterFormik).length).toBe(1);
    expect(component.find(RegisterAccount).length).toBe(1);
    expect(component.find('h1').length).toBe(1);
  });

  it('should simulate success register', () => {
    store.dispatch(Actions.authSuccess('some message', HTTPCodes.OK));

    component.update();

    expect(component.find(RegisterFormik).prop('status')).toBe(HTTPCodes.OK);
  });

  it('should switch account', () => {
    const btn = component.find(RegisterAccount).find('li').find('button').at(1);

    btn.simulate('click', 'company');

    component.update();

    expect(component.find(RegisterFormik).prop('accountType')).toBe('company');
  });

  it('should switch 2 times account type', async () => {
    component.find('button.company').simulate('click');
    component.update();

    expect(component.find(RegisterFormik).prop('accountType')).toBe('company');

    component.find('button.user').simulate('click');
    component.update();

    expect(component.find(RegisterFormik).prop('accountType')).toBe('user');
  });

  it('should close sweet allert after button clicked', async done => {
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
        expect(component.find(sweetAlert).length).toBe(0);
        done();
      }, 100);
    });
  });

  it('should close alert after button clicked', async done => {
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

  it('should auto close alert after 4s', async done => {
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

  it('should close alert on success action after button is clicked', async done => {
    await act(async () => {
      store.dispatch(Actions.authSuccess('Invalid username', HTTPCodes.OK));

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
