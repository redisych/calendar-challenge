import './styles.css';
import * as React from 'react';
import { EventsLayout } from '../events-layout';
import { TimeScale } from '../time-scale';

export const Calendar: React.FunctionComponent<{}> = (): JSX.Element => (
    <div className="calendar">
        <TimeScale />
        <EventsLayout />
    </div>
);
