import './styles.css';
import * as React from 'react';
import { CalendarEvent, ClusterCalendarEvent } from 'src/constants/common-interfaces';
import { CalendarEventNote } from 'src/components/calendar-event-note';
import { CalendarEventsHelper } from 'src/helpers/calendar-events-helper';
import { calendarTimeSettings } from 'src/constants/scale-constants';
import { layoutSettings } from 'src/constants/layout-settings';

interface EventsCluster {
    events: ClusterCalendarEvent[];
}

interface LayoutStyleSettings {
    height: number;
    minWidth: number;
    width: number;
}

interface State {
    eventsClusters: EventsCluster[];
}

export class EventsLayout extends React.PureComponent<{}, State> {
    public state = {
        eventsClusters: []
    };

    public componentDidMount(): void {
        document.addEventListener('layOutDay', this.updateLayOut);
    }

    public render(): JSX.Element {
        return (
            <div
                className="events-layout"
                style={this.getLayoutStyle()}
            >
                {this.state.eventsClusters.map((cluster: EventsCluster, index) => 
                    this.renderEventsCluster(index, cluster)
                )}
            </div>
        );
    }

    private addEventToCluster(calendarEvent: CalendarEvent, eventsCluster: EventsCluster): EventsCluster {
        const { events } = eventsCluster;

        return {
            ...eventsCluster,
            events: [...events, this.extendEventWithWidthShift(calendarEvent, events)]
        };
    }

    private addEventToClustersLayout(calendarEvent: CalendarEvent, eventsClusters: EventsCluster[]): EventsCluster[] {
        const newLayout: EventsCluster[] = [...eventsClusters];

        // if no clusters - create the first one
        if (newLayout.length === 0) {
            const newCluster = this.addEventToEmptyCluster(calendarEvent);

            newLayout.push(newCluster);

            return newLayout;
        }

        const latestCluster = newLayout[newLayout.length - 1];
        const latestEventInCluster = latestCluster.events[latestCluster.events.length - 1];

        // if doesn't collide in time with previous - create a new cluster
        if (!CalendarEventsHelper.eventHasTimeCollisionWithPrevious(latestEventInCluster, calendarEvent)) {
            const newCluster = this.addEventToEmptyCluster(calendarEvent);
            newLayout.push(newCluster);

            return newLayout;
        }

        // else - add event to an existing cluster
        const updatedLatestCluster = this.addEventToCluster(calendarEvent, latestCluster);

        return [...newLayout.slice(0, -1), updatedLatestCluster];
    }

    private addEventToEmptyCluster(calendarEvent: CalendarEvent): EventsCluster {
        const clusterEvent = {
            ...calendarEvent,
            widthShift: 0
        };

        return {
            events: [clusterEvent]
        };
    }

    private calculateNoteWidth = (cluster: EventsCluster): number => {
        const maxWidthShift = cluster.events.reduce(
            (maxValue: number, event: ClusterCalendarEvent) => {
                maxValue = event.widthShift > maxValue ?
                    event.widthShift :
                    maxValue;
                return maxValue;
            },
            0
        );

        return layoutSettings.contentWidth / (maxWidthShift + 1);
    }

    private extendEventWithWidthShift(
        calendarEvent: CalendarEvent,
        clusterEvents: ClusterCalendarEvent[]
    ): ClusterCalendarEvent {
        const newClusterEvent = {
            ...calendarEvent,
            widthShift: 0
        };
        let hasCollisions = CalendarEventsHelper.eventHasCollisions(newClusterEvent, clusterEvents);

        while (hasCollisions) {
            newClusterEvent.widthShift ++;
            hasCollisions = CalendarEventsHelper.eventHasCollisions(newClusterEvent, clusterEvents);
        }

        return newClusterEvent;
    }

    private getLayoutStyle = (): LayoutStyleSettings => {
        const width = layoutSettings.contentWidth + (layoutSettings.padding * 2);

        return ({
            minWidth: width,
            width,
            height: calendarTimeSettings.minutesInDay
        });
    }

    private renderEventsCluster = (index: number, cluster: EventsCluster): JSX.Element => {
        return (
            <React.Fragment key={index}>
                {cluster.events.map((clusterEvent: ClusterCalendarEvent, eventIndex) => {
                    return (
                        <CalendarEventNote
                            key={eventIndex}
                            event={clusterEvent}
                            width={this.calculateNoteWidth(cluster)}
                        />
                    );
                })}
            </React.Fragment>
        );
    }

    private updateLayOut = (event: CustomEvent): void => {
        const { calendarEvents } = event.detail;
        const sortedEvents = CalendarEventsHelper.sortEvents(calendarEvents);
        let eventsClusters: EventsCluster[] = [];

        sortedEvents.forEach((calendarEvent: CalendarEvent) => {
            eventsClusters = this.addEventToClustersLayout(calendarEvent, eventsClusters);
        });

        this.setState({
            eventsClusters
        });
    }
}
