import React from 'react';
import About from '@containers/About';
import Accordion from '@components/UI/accordion';
import { mount } from 'enzyme';
import ThemeProvider from '@styled/Providers';

import ReduxProvider from '../../__mocks__/provider';

interface CustomNodeJsGlobal extends NodeJS.Global {
  dispatchEvent: (prop: Event) => void;
}

// Tell Typescript to use this type for the already existent global `global` variable.
declare const global: CustomNodeJsGlobal;

describe('Testing About component', () => {
  it('should render component', () => {
    const component = mount(
      <ReduxProvider>
        <ThemeProvider>
          <About />
        </ThemeProvider>
      </ReduxProvider>
    );

    expect(component).toBeTruthy();
    component.find(Accordion).find('button').at(0).simulate('click');

    component.update();

    component.find(Accordion).find('button').at(0).simulate('click');

    component.update();

    component.find(Accordion).find('button').at(0).simulate('click');

    component.update();

    component.find(Accordion).find('button').at(1).simulate('click');

    global.dispatchEvent(new Event('resize'));
    component.unmount();
  });
});
