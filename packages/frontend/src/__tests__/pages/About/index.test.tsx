import React from 'react';
import About from '@pages/About';
import Accordion from '@components/UI/accordion';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

interface CustomNodeJsGlobal extends NodeJS.Global {
    dispatchEvent: (prop: Event) => void;
    // You can declare anything you need.
}

// Tell Typescript to use this type for the already existent global `global` variable.
declare const global: CustomNodeJsGlobal;

describe('Testing About component', () => {
  it('should render component', () => {
    const component = mount(
      <BrowserRouter>
        <About />
      </BrowserRouter>
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
