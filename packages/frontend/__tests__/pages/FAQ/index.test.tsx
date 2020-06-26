import React from 'react';
import { mount } from 'enzyme';
import { waitFor, render, fireEvent } from '@testing-library/react';

import FAQ from '@containers/FAQ';
import FaqFormik from '@containers/FAQ/FaqFormik';
import { store, Actions } from '@job/redux';
import { ErrorDiv } from '@components/UI/input/styled';
import { Button, Wrapper } from '@components/UI/alert/styled';
import { FormButton } from '@containers/FAQ/styled';
import ThemeProvider from '@styled/Providers';

import ReduxProvider from '../../__mocks__/provider';

describe('Testing Faq component', () => {
  it('should render component', () => {
    const component = mount(
      <ReduxProvider>
        <ThemeProvider>
          <FAQ />
        </ThemeProvider>
      </ReduxProvider>
    );

    expect(component.find('h1').length).toBe(1);

    component.unmount();
  });

  it('should simulate closing alert', async done => {
    const { container, rerender } = render(
      <ReduxProvider>
        <ThemeProvider>
          <FAQ />
        </ThemeProvider>
      </ReduxProvider>
    );

    store.dispatch(Actions.contactMessageSuccess('message', 200));

    rerender(
      <ReduxProvider>
        <ThemeProvider>
          <FAQ />
        </ThemeProvider>
      </ReduxProvider>
    );

    const button = container.querySelector(Button) as HTMLButtonElement;

    await waitFor(() => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      setTimeout(() => {
        expect(container.querySelectorAll(Wrapper).length).toBe(0);
        done();
      }, 2000);
    });
  });

  it('should render 4 errors', async () => {
    const { container } = render(
      <ReduxProvider>
        <ThemeProvider>
          <FaqFormik disabled={false} status={null} />
        </ThemeProvider>
      </ReduxProvider>
    );
    const submit = container.querySelector(FormButton) as HTMLButtonElement;

    await waitFor(() => {
      fireEvent.click(submit);
    });

    expect(container.querySelectorAll(ErrorDiv).length).toBe(4);
  });

  it('should render 4 errors', async () => {
    const { container, rerender } = render(
      <ReduxProvider>
        <ThemeProvider>
          <FaqFormik disabled={false} status={null} />
        </ThemeProvider>
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

    expect(container.querySelectorAll(ErrorDiv).length).toBe(0);

    rerender(
      <ReduxProvider>
        <ThemeProvider>
          <FaqFormik disabled={false} status={200} />
        </ThemeProvider>
      </ReduxProvider>
    );

    expect(container.querySelector('button')?.disabled).toBe(false);
  });
});
