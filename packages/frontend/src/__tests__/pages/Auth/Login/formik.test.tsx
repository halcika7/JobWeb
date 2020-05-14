import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReduxProvider from '@store/provider';
import { waitFor, render, fireEvent } from '@testing-library/react';

import LoginFormik from '@pages/Auth/Login/LoginFormik';
import Login from '@pages/Auth/Login';

const values = {
  buttonDisabled: false,
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
  it('should render 2 errors', async () => {
    const { container } = render(
      <ReduxProvider>
        <BrowserRouter>
          <LoginFormik {...values} />
        </BrowserRouter>
      </ReduxProvider>
    );

    const submit = container.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    await waitFor(() => {
      fireEvent.click(submit);
    });

    expect(container.querySelectorAll('.error').length).toBe(2);
  });

  it('should render 0 errors', async () => {
    const { container, rerender } = render(
      <ReduxProvider>
        <BrowserRouter>
          <LoginFormik {...values} />
        </BrowserRouter>
      </ReduxProvider>
    );
    const username = container.querySelector(
      'input[name="username"]'
    ) as HTMLInputElement;
    const password = container.querySelector(
      'input[name="password"]'
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

      fireEvent.change(password, {
        target: {
          value: '!Qq1234567890',
        },
      });
    });

    await waitFor(() => {
      fireEvent.click(submit);
    });

    expect(container.querySelectorAll('.error').length).toBe(0);

    rerender(
      <ReduxProvider>
        <BrowserRouter>
          <LoginFormik {...values} status={201} />
        </BrowserRouter>
      </ReduxProvider>
    );

    expect(container.querySelector('button')?.disabled).toBe(false);
  });

  it('should fire login action', async () => {
    const { container } = render(
      <ReduxProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </ReduxProvider>
    );
    const username = container.querySelector(
      'input[name="username"]'
    ) as HTMLInputElement;
    const password = container.querySelector(
      'input[name="password"]'
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

      fireEvent.change(password, {
        target: {
          value: '!Qq1234567890',
        },
      });
    });

    await waitFor(() => {
      fireEvent.click(submit);
    });

    expect(container.querySelectorAll('.error').length).toBe(0);
  });
});
