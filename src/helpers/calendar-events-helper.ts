import { CalendarEvent, ClusterCalendarEvent } from '../constants/common-interfaces';

export class CalendarEventsHelper {
    public static eventHasCollisions(
        currentClusterEvent: ClusterCalendarEvent,
        clusterEvents: ClusterCalendarEvent[]
    ): boolean {
        for (const event of clusterEvents) {
            if (CalendarEventsHelper.eventHasPositionCollisionWithPrevious(
                event,
                currentClusterEvent
            )) {
                return true;
            }
        }

        return false;
    }

    public static eventHasPositionCollisionWithPrevious(
        previousClusterEvent: ClusterCalendarEvent,
        currentClusterEvent: ClusterCalendarEvent
    ): boolean {
        return CalendarEventsHelper.eventHasTimeCollisionWithPrevious(
            previousClusterEvent,
            currentClusterEvent
        ) &&
        previousClusterEvent.widthShift === currentClusterEvent.widthShift;
    }

    public static eventHasTimeCollisions(
        currentClusterEvent: ClusterCalendarEvent,
        clusterEvents: ClusterCalendarEvent[]
    ): boolean {
        for (const event of clusterEvents) {
            if (CalendarEventsHelper.eventHasTimeCollisionWithPrevious(
                event,
                currentClusterEvent
            )) {
                return true;
            }
        }

        return false;
    }

    public static eventHasTimeCollisionWithPrevious(
        previousEvent: CalendarEvent,
        currentEvent: CalendarEvent
    ): boolean {
        return currentEvent.start >= previousEvent.start &&
            currentEvent.start < previousEvent.end;
    }

    public static sortEvents(events: CalendarEvent[]): CalendarEvent[] {
        return events.sort((event1, event2) => {
            if (event1.start === event2.start) {
                return event2.end - event1.end;
            } else {
                return event1.start - event2.start;
            }
        });
    }
}
