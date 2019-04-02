import * as React from 'react';
import * as enzyme from 'enzyme';
import { Calendar } from '..';
import toJson from 'enzyme-to-json';

const getWrapper = (): any => {
    return enzyme.shallow(
        <Calendar />
    );
};

describe('Calendar', () => {
    it('should be defined', () => {
        const wrapper = getWrapper();

        expect(wrapper).toBeDefined();
    });

    it('should match snapshot', () => {
        const wrapper = getWrapper();

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
