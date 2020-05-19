import React from 'react';
import { waitFor, render, fireEvent } from '@testing-library/react';

import RegisterFormik from '@containers/Auth/Register/RegisterFormik';
import Register from '@containers/Auth/Register';
import { AccountRegistrationType } from '@containers/Auth/store/types';
import { Select, CountryActions } from '@country/types';
import store from '@store/index';
import axios from '@axios';
import moxios from 'moxios';

import { ErrorDiv } from '@components/UI/input/styled';

import ReduxProvider from '../../../__mocks__/provider';

const values = {
  accountType: 'company' as AccountRegistrationType,
  buttonDisabled: false,
  countries: [
    { value: 'Bosnia and Herzegovina', label: 'Bosnia and Herzegovina' },
  ] as Select[],
  cities: { 'Bosnia and Herzegovina': [{ value: 'Zenica', label: 'Zenica' }] },
  status: null,
  onSubmit: jest.fn(),
  errors: {
    username: '',
    email: '',
    password: '',
    password2: '',
    phone: '',
    country: '',
    city: '',
    company: '',
    website: '',
  },
  values: {
    username: '',
    email: '',
    password: '',
    password2: '',
    phone: '',
    country: '',
    city: '',
    company: '',
    website: '',
  },
  touched: {
    username: false,
    email: false,
    password: false,
    password2: false,
    country: false,
    city: false,
    phone: false,
    website: false,
    company: false,
  },
};

describe('Testing Faq component', () => {
  it('should render 8 errors', async () => {
    const { container } = render(
      <ReduxProvider>
        <RegisterFormik {...values} />
      </ReduxProvider>
    );

    const submit = container.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    await waitFor(() => {
      fireEvent.click(submit);
    });

    expect(container.querySelectorAll(ErrorDiv).length).toBe(8);
  });

  it('should render 0 errors', async () => {
    const { container, rerender, getByText } = render(
      <ReduxProvider>
        <RegisterFormik {...values} />
      </ReduxProvider>
    );
    const username = container.querySelector(
      'input[name="username"]'
    ) as HTMLInputElement;
    const password = container.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;
    const password2 = container.querySelector(
      'input[name="password2"]'
    ) as HTMLInputElement;
    const email = container.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const phone = container.querySelector(
      'input[name="phone"]'
    ) as HTMLInputElement;
    const website = container.querySelector(
      'input[name="website"]'
    ) as HTMLInputElement;
    const company = container.querySelector(
      'input[name="company"]'
    ) as HTMLInputElement;
    const submit = container.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    await waitFor(() => {
      fireEvent.change(username, {
        target: {
          value: 'some name',
        },
      });

      fireEvent.change(website, {
        target: {
          value: 'https://www.instagram.com/',
        },
      });

      fireEvent.change(company, {
        target: {
          value: 'company name',
        },
      });

      fireEvent.change(phone, {
        target: {
          value: '+38761111111',
        },
      });

      fireEvent.change(email, {
        target: {
          value: 'name@gmail.com',
        },
      });

      fireEvent.change(password, {
        target: {
          value: '!Qq1234567890',
        },
      });

      fireEvent.change(password2, {
        target: {
          value: '!Qq1234567890',
        },
      });
    });

    const select = container.querySelectorAll('.css-tlfecz-indicatorContainer');

    await waitFor(() => {
      fireEvent.focus(select[0]);
      fireEvent.keyDown(select[0], { key: 'ArrowDown', code: 40 });
      fireEvent.click(getByText('Bosnia and Herzegovina'));
    });

    await waitFor(() => {
      fireEvent.focus(select[1]);
      fireEvent.keyDown(select[1], { key: 'ArrowDown', code: 40 });
      fireEvent.click(getByText('Zenica'));
    });

    await waitFor(() => {
      fireEvent.click(submit);
    });

    expect(container.querySelectorAll(ErrorDiv).length).toBe(0);

    rerender(
      <ReduxProvider>
        <RegisterFormik {...values} status={200} />
      </ReduxProvider>
    );

    expect(container.querySelector('button')?.disabled).toBe(false);
  });

  it('should fire register action', async () => {
    moxios.install(axios);
    const { container, getByText } = render(
      <ReduxProvider>
        <Register />
      </ReduxProvider>
    );

    store.dispatch({
      type: CountryActions.COUNTRY_SUCCESS,
      payload: {
        countries: [
          { value: 'Bosnia and Herzegovina', label: 'Bosnia and Herzegovina' },
        ],
        cities: {
          'Bosnia and Herzegovina': [{ value: 'Zenica', label: 'Zenica' }],
        },
      },
    });
    const username = container.querySelector(
      'input[name="username"]'
    ) as HTMLInputElement;
    const password = container.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;
    const password2 = container.querySelector(
      'input[name="password2"]'
    ) as HTMLInputElement;
    const email = container.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const phone = container.querySelector(
      'input[name="phone"]'
    ) as HTMLInputElement;
    const submit = container.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    await waitFor(() => {
      fireEvent.change(username, {
        target: {
          value: 'some name',
        },
      });

      fireEvent.change(phone, {
        target: {
          value: '+38761111111',
        },
      });

      fireEvent.change(email, {
        target: {
          value: 'name@gmail.com',
        },
      });

      fireEvent.change(password, {
        target: {
          value: '!Qq1234567890',
        },
      });

      fireEvent.change(password2, {
        target: {
          value: '!Qq1234567890',
        },
      });
    });

    const select = container.querySelectorAll('.css-tlfecz-indicatorContainer');

    await waitFor(() => {
      fireEvent.focus(select[0]);
      fireEvent.keyDown(select[0], { key: 'ArrowDown', code: 40 });
      fireEvent.click(getByText('Bosnia and Herzegovina'));
    });

    await waitFor(() => {
      fireEvent.focus(select[1]);
      fireEvent.keyDown(select[1], { key: 'ArrowDown', code: 40 });
      fireEvent.click(getByText('Zenica'));
    });

    await waitFor(() => {
      fireEvent.click(submit);
    });

    expect(container.querySelectorAll(ErrorDiv).length).toBe(0);
    moxios.uninstall();
  });
});
