import * as React from 'react';
import * as enzyme from 'enzyme';
import { EventsLayout } from '..';
import toJson from 'enzyme-to-json';

const getWrapper = (): any => {
    return enzyme.shallow(
        <EventsLayout />
    );
};

describe('EventsLayout', () => {
    it('should be defined', () => {
        const wrapper = getWrapper();

        expect(wrapper).toBeDefined();
    });

    it('should match snapshot', () => {
        const wrapper = getWrapper();

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should listen to layOutDay event', () => {
        const fakeLayOutListener = jest.fn((event, callback) => {
            const fakeEvent = new CustomEvent(
                event,
                {
                    detail: {
                        calendarEvents: []
                    }
                }
            );
            callback(fakeEvent);
        });

        fakeLayOutListener.mock.calls = [];
        document.addEventListener = fakeLayOutListener;

        getWrapper(); 
        expect(fakeLayOutListener.mock.calls.length).toBe(1);
    });

    it('should correctly calculate children clusters count', () => {
        const mockCalendarEvents = [{start: 0, end: 60}, {start: 60, end: 100}];
        const fakeLayOutListener = jest.fn((event, callback) => {
            const fakeEvent = new CustomEvent(
                event,
                {
                    detail: {
                        calendarEvents: mockCalendarEvents
                    }
                }
            );
            callback(fakeEvent);
        });

        document.addEventListener = fakeLayOutListener;

        const wrapper = getWrapper();
        const eventsClusters = wrapper.state().eventsClusters;
        expect(eventsClusters).toHaveLength(2);
        expect(wrapper.children()).toHaveLength(2);
    });
});
