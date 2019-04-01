import './styles.css';
import * as React from 'react';
import { ClusterCalendarEvent } from 'src/constants/common-interfaces';
import { layoutSettings } from 'src/constants/layout-settings';

interface Props {
    event: ClusterCalendarEvent;
    width: number;
}

interface NoteStyle {
    height: number;
    left: number;
    top: number;
    width: number;
}

export const CalendarEventNote: React.FunctionComponent<Props> = (props): JSX.Element => {
    const calculateLeftPosition = (): number => {
        return (props.event.widthShiftCoefficient * props.width)
            + layoutSettings.padding;
    };

    const getNoteStyle = (): NoteStyle => {
        const { end, start } = props.event;

        return ({
            height: end - start,
            left: calculateLeftPosition(),
            top: start,
            width: props.width
        });
    };

    return (
        <div
            className="calendar-event-note"
            style={getNoteStyle()}
        >
            <div className="note-header">Sample Item</div>
            <div className="note-location">Sample Location</div>
        </div>
    );
};