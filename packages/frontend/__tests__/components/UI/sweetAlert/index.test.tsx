import React from 'react';
import { mount } from 'enzyme';
import SweetAlert from '@components/UI/sweetAlert';

describe('Testing Sweet alert component', () => {
  it('shoulld render component', () => {
    const comp = mount(
      <SweetAlert
        message="message"
        additionalMessage="additional message"
        type="error"
        withButtons={false}
        callBack={() => jest.fn()}
      />
    );

    comp.unmount();
  });

  it('shoulld render info component', () => {
    const comp = mount(
      <SweetAlert
        message="message"
        additionalMessage="additional message"
        type="info"
        withButtons={false}
        callBack={() => jest.fn()}
      />
    );

    comp.unmount();
  });

  it('shoulld render warning component', () => {
    const comp = mount(
      <SweetAlert
        message="message"
        additionalMessage="additional message"
        type="warning"
        withButtons={false}
        callBack={() => jest.fn()}
      />
    );

    comp.unmount();
  });
});
