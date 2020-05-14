import React from 'react';
import Terms from '@pages/Terms';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

describe('Testing Faq component', () => {
  it('should render component', () => {
    const component = mount(
      <BrowserRouter>
        <Terms />
      </BrowserRouter>
    );

    expect(component.find('h1').length).toBe(1);
    component.unmount();
  });
});
