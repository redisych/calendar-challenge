import './styles.css';
import * as React from 'react';
import { DAY_TIME_INFO, calendarTimeSettings } from 'src/constants/scale-constants';

interface Props {
    isHalfHour: boolean;
    minute: number;
}

export class Tick extends React.PureComponent<Props, {}> {
    public render(): JSX.Element {
        return (
            <div className="tick">
                <span className={this.getTimeLabelClassName()}>
                    {this.getTimeLabel()}
                </span>
                {!this.props.isHalfHour &&
                    <span className="time-mark">
                        {this.getTimeMark()}
                    </span>
                }
            </div>
        );
    }

    private getTimeLabel = (): string => {
        const { minute } = this.props;

        const hour = Math.floor(minute / DAY_TIME_INFO.MINUTES_IN_HOUR) + calendarTimeSettings.hourDayStart;
        const hourToDisplay = hour > DAY_TIME_INFO.HOUR_NOON ?
            hour - DAY_TIME_INFO.HOUR_NOON :
            hour;

        const restMinutes = minute % DAY_TIME_INFO.MINUTES_IN_HOUR;
        const restMinutesToDisplay = restMinutes === 0 ?
            '00' :
            String(restMinutes);

        return `${hourToDisplay}:${restMinutesToDisplay}`;
    }

    private getTimeLabelClassName = (): string => {
        let className = 'time-label';

        className += this.props.isHalfHour ? ' time-label-half-hour' : '';

        return className;
    }

    private getTimeMark = (): string => {
        const { minute } = this.props;
        const minuteNoon =
            (DAY_TIME_INFO.HOUR_NOON - calendarTimeSettings.hourDayStart) *
            DAY_TIME_INFO.MINUTES_IN_HOUR;

        return minute < minuteNoon ? 'AM' : 'PM';
    }
}
