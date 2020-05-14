import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import ReduxProvider from '@store/provider';
import { waitFor, render, fireEvent } from '@testing-library/react';

import FAQ from '@pages/FAQ';
import FaqFormik from '@pages/FAQ/FaqFormik';
import store from '@store/index';
import { contactMessageSuccess } from '@pages/Contact/store/actions';

describe('Testing Faq component', () => {
  it('should render component', () => {
    const component = mount(
      <ReduxProvider>
        <BrowserRouter>
          <FAQ />
        </BrowserRouter>
      </ReduxProvider>
    );

    expect(component.find('h1').length).toBe(2);

    component.unmount();
  });

  it('should simulate closing alert', async done => {
    const { container, rerender } = render(
      <ReduxProvider>
        <BrowserRouter>
          <FAQ />
        </BrowserRouter>
      </ReduxProvider>
    );

    store.dispatch(contactMessageSuccess('message', 200));

    rerender(
      <ReduxProvider>
        <BrowserRouter>
          <FAQ />
        </BrowserRouter>
      </ReduxProvider>
    );

    const button = container.querySelector(
      '.alert-wrapper button'
    ) as HTMLButtonElement;

    await waitFor(() => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      setTimeout(() => {
        expect(container.querySelectorAll('.alert-wrapper').length).toBe(0);
        done();
      }, 2000);
    });
  });

  it('should render 4 errors', async () => {
    const { container } = render(
      <ReduxProvider>
        <BrowserRouter>
          <FaqFormik disabled={false} status={null} />
        </BrowserRouter>
      </ReduxProvider>
    );
    const submit = container.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    await waitFor(() => {
      fireEvent.click(submit);
    });

    expect(container.querySelectorAll('.error').length).toBe(4);
  });

  it('should render 4 errors', async () => {
    const { container, rerender } = render(
      <ReduxProvider>
        <BrowserRouter>
          <FaqFormik disabled={false} status={null} />
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
          <FaqFormik disabled={false} status={200} />
        </BrowserRouter>
      </ReduxProvider>
    );

    expect(container.querySelector('button')?.disabled).toBe(false);
  });
});
