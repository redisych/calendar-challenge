import * as React from 'react';
import * as enzyme from 'enzyme';
import { CalendarEventNote } from '..';
import toJson from 'enzyme-to-json';

const event = {
    start: 0,
    end: 60,
    widthShift: 0
};

const getWrapper = (): any => {
    return enzyme.shallow(
        <CalendarEventNote
            event={event}
            width={100}
        />
    );
};

describe('CalendarEventNote', () => {
    it('should be defined', () => {
        const wrapper = getWrapper();

        expect(wrapper).toBeDefined();
    });

    it('should match snapshot', () => {
        const wrapper = getWrapper();

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render styles correctly', () => {
        const wrapper = getWrapper();

        expect(wrapper.prop('style')).toHaveProperty('width', 100);
        expect(wrapper.prop('style')).toHaveProperty('height', 60);
        expect(wrapper.prop('style')).toHaveProperty('left', 10);
        expect(wrapper.prop('style')).toHaveProperty('top', 0);
    });

    it('should calculate left offset correctly for widthShift > 0', () => {
        const wrapper = getWrapper();

        const newEvent = {
            ...event,
            widthShift: 1
        };
        wrapper.setProps({
            event: newEvent
        });

        expect(wrapper.prop('style')).toHaveProperty('left', 110);
    });
});
