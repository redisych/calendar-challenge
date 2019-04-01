export interface CalendarEvent {
    end: number;
    start: number;
}

export interface ClusterCalendarEvent extends CalendarEvent {
    widthShift: number;
}
