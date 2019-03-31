import './styles.css';
import * as React from 'react';
import { TimeScale } from 'src/components/time-scale';

export class Calendar extends React.PureComponent<{}, {}> {
    public render(): JSX.Element {
        return (
            <div className="calendar">
                <TimeScale />
                <div className="calendar-layout">
                    TODO: layout
                </div>
            </div>
        );
    }
}
