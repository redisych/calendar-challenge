import './styles.css';
import * as React from 'react';
import { EventsLayout } from 'src/components/events-layout';
import { TimeScale } from 'src/components/time-scale';

export class Calendar extends React.PureComponent<{}, {}> {
    public render(): JSX.Element {
        return (
            <div className="calendar">
                <TimeScale />
                <EventsLayout />
            </div>
        );
    }
}
