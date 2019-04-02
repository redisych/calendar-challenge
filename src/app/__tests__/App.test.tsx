import * as React from 'react';
import * as enzyme from 'enzyme';
import { App } from '..';
import toJson from 'enzyme-to-json';

const getWrapper = (): any => {
    return enzyme.shallow(<App />);
};

describe('App', () => {
    it('should be defined', () => {
        const wrapper = getWrapper();

        expect(wrapper).toBeDefined();
    });

    it('should match snapshot', () => {
        const wrapper = getWrapper();

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
