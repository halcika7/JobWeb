import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReduxProvider from '@store/provider';
import { waitFor, render, fireEvent } from '@testing-library/react';

import ContactFormik from '@pages/Contact/ContactFormik';

const values = {
  disabled: false,
  status: null,
  postNewMessage: jest.fn(),
  errors: { name: '', subject: '', message: '', phone: '', email: '' },
  values: { name: '', subject: '', message: '', phone: '', email: '' },
  touched: {
    name: false,
    subject: false,
    message: false,
    phone: false,
    email: false,
  },
};

describe('Testing Faq component', () => {
  it('should render 5 errors', async () => {
    const { container } = render(
      <ReduxProvider>
        <BrowserRouter>
          <ContactFormik {...values} />
        </BrowserRouter>
      </ReduxProvider>
    );

    const phone = container.querySelector(
      'input[name="phone"]'
    ) as HTMLInputElement;

    const submit = container.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    await waitFor(() => {
      fireEvent.change(phone, {
        target: {
          value: '+1 321',
        },
      });
    });

    await waitFor(() => {
      fireEvent.click(submit);
    });

    expect(container.querySelectorAll('.error').length).toBe(5);
  });

  it('should render 0 errors', async () => {
    const { container, rerender } = render(
      <ReduxProvider>
        <BrowserRouter>
          <ContactFormik {...values} />
        </BrowserRouter>
      </ReduxProvider>
    );
    const name = container.querySelector(
      'input[name="name"]'
    ) as HTMLInputElement;
    const email = container.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const subject = container.querySelector(
      'input[name="subject"]'
    ) as HTMLInputElement;
    const phone = container.querySelector(
      'input[name="phone"]'
    ) as HTMLInputElement;
    const message = container.querySelector('textarea') as HTMLTextAreaElement;
    const submit = container.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    await waitFor(() => {
      fireEvent.change(name, {
        target: {
          value: 'some name',
        },
      });

      fireEvent.change(email, {
        target: {
          value: 'email@gmail.com',
        },
      });

      fireEvent.change(subject, {
        target: {
          value: 'some subject',
        },
      });

      fireEvent.change(phone, {
        target: {
          value: '',
        },
      });

      fireEvent.change(message, {
        target: {
          value:
            'jasodjaoido fkoodsjfoijsdif dsfoijdoifjsd sfojosdjfpos sdfojspdfjp',
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
          <ContactFormik {...values} status={201} />
        </BrowserRouter>
      </ReduxProvider>
    );

    expect(container.querySelector('button')?.disabled).toBe(false);
  });
});
