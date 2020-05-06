import React from 'react';
import ReduxProvider from '@store/provider';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';

import Register from '@pages/Auth/Register';
import Breadcrumb from '@components/UI/breadcrumb';
import RegisterFormik from '@pages/Auth/Register/RegisterFormik';
import RegisterAccount from '@pages/Auth/Register/RegisterAccount';
import store from '@store/index';

import { authSuccess } from '@pages/Auth/store/actions';
import { HTTPCodes } from '@job/common';

describe('Testing Register Page', () => {
  let component: ReactWrapper;

  beforeAll(() => {
    component = mount(
      <ReduxProvider>
        <Router>
          <Register />
        </Router>
      </ReduxProvider>
    );
  });

  afterAll(() => {
    component.unmount();
  });

  it('should render each component', () => {
    expect(component.find(Breadcrumb).length).toBe(1);
    expect(component.find(RegisterFormik).length).toBe(1);
    expect(component.find(RegisterAccount).length).toBe(1);
    expect(component.find('h1').length).toBe(1);
  });

  it('should simulate success register', () => {
    store.dispatch(authSuccess('some message', HTTPCodes.OK));

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
});
