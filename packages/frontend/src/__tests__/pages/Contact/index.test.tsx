import React from 'react';
import Contact from '@pages/Contact';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import ReduxProvider from '@store/provider';
import { waitFor, render, fireEvent } from '@testing-library/react';
import store from '@store/index';
import { contactMessageSuccess } from '@pages/Contact/store/actions';

describe('Testing Contact component', () => {
  it('should render', () => {
    const component = mount(
      <ReduxProvider>
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      </ReduxProvider>
    );

    expect(component).toBeTruthy();
    component.unmount();
  });

  it('should simulate closing alert after success', async done => {
    const component = mount(
      <ReduxProvider>
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      </ReduxProvider>
    );

    store.dispatch(contactMessageSuccess('message', 201));

    component.update();

    const button = component.find('button');

    button.at(0).simulate('click');

    await waitFor(() => {
      setTimeout(() => {
        expect(component.find('button').length).toBe(1);
        component.unmount();
        done();
      }, 2000);
    });
  });

  it('should simulate closing alert after failed', async done => {
    const component = mount(
      <ReduxProvider>
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      </ReduxProvider>
    );

    store.dispatch(contactMessageSuccess('message', 400));

    component.update();

    const button = component.find('button');

    button.at(0).simulate('click');

    await waitFor(() => {
      setTimeout(() => {
        expect(component.find('button').length).toBe(1);
        component.unmount();
        done();
      }, 2000);
    });
  });

  it('should render 4 errors', async () => {
    const { container } = render(
      <ReduxProvider>
        <BrowserRouter>
          <Contact />
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
          <Contact />
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
          value: '+38761111111',
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
          <Contact />
        </BrowserRouter>
      </ReduxProvider>
    );

    expect(container.querySelector('button')?.disabled).toBe(true);
  });
});
