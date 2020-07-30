import React from 'react';
import Terms from '@containers/Terms';
import { mount } from 'enzyme';

import ReduxProvider from '../../__mocks__/provider';
import ThemeProvider from 'src/styled/Providers';

describe('Testing Faq component', () => {
  it('should render component', () => {
    const component = mount(
      <ReduxProvider>
        <ThemeProvider>
          <Terms />
        </ThemeProvider>
      </ReduxProvider>
    );

    expect(component.find('h1').length).toBe(1);
    component.unmount();
  });
});
