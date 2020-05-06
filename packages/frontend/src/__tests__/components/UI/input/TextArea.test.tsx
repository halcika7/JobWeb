import React from 'react';
import {mount} from 'enzyme';
import TextArea from '@components/UI/input/TextArea';

describe('Testing Text area component', () => {
    it('shoulld render component', () => {
        const comp = mount(<TextArea classNames="input" label="area" name="area" required />);

        expect(comp).toBeTruthy();
        comp.unmount();
    });
});