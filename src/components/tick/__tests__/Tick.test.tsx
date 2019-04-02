import * as React from 'react';
import * as enzyme from 'enzyme';
import { Tick } from '..';
import toJson from 'enzyme-to-json';

const getWrapper = (): any => {
    return enzyme.shallow(<Tick minute={60} />);
};

describe('Tick', () => {
    it('should be defined', () => {
        const wrapper = getWrapper();

        expect(wrapper).toBeDefined();
    });

    it('should match snapshot', () => {
        const wrapper = getWrapper();

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render time mark if is an hour', () => {
        const wrapper = getWrapper();

        expect(wrapper.find('.time-mark').exists()).toBeTruthy();
    });

    it('should not render time mark if is half an hour', () => {
        const wrapper = getWrapper();

        wrapper.setProps({
            minute: 30
        });

        expect(wrapper.find('.time-mark').exists()).toBeFalsy();
    });

    it('should not render time label with className "time-label-half-hour" if is an hour', () => {
        const wrapper = getWrapper();

        expect(wrapper.find('.time-label').hasClass('time-label-half-hour')).toBeFalsy();
    });

    it('should render time label with className "time-label-half-hour" if is a half an hour', () => {
        const wrapper = getWrapper();

        wrapper.setProps({
            minute: 30
        });

        expect(wrapper.find('.time-label').hasClass('time-label-half-hour')).toBeTruthy();
    });
});
