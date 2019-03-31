import { CalendarEvent } from 'src/constants/common-interfaces';

export const layOutDay = (calendarEvents: CalendarEvent[]): void => {
    const event = new CustomEvent(
        'layOutDay',
        {
            detail: {
                calendarEvents
            }
        }
    );

    document.dispatchEvent(event);
};
