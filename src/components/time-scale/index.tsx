import './styles.css';
import * as React from 'react';
import { DAY_TIME_INFO, calendarTimeSettings } from 'src/constants/scale-constants';
import { Tick } from 'src/components/tick';

interface TickItem {
    minute: number;
}

interface State {
    ticks: TickItem[];
}

export class TimeScale extends React.PureComponent<{}, State> {
    public state = {
        ticks: []
    };

    public componentDidMount(): void {
        this.initTimeScale();
    }

    public render(): JSX.Element {
        return (
            <div className="time-scale">
                {this.state.ticks.map((tick: TickItem) => (
                    <Tick
                        key={tick.minute}
                        minute={tick.minute}
                    />
                ))}
            </div>
        );
    }

    private calculateMinutesInTick(tickIndex: number): number {
        const minutesInHalfHour = DAY_TIME_INFO.MINUTES_IN_HOUR / 2;

        return tickIndex * minutesInHalfHour;
    }

    private initTimeScale(): void {
        const countHoursInDay = Math.ceil(calendarTimeSettings.minutesInDay / DAY_TIME_INFO.MINUTES_IN_HOUR);
        const countTicksInDay = countHoursInDay * 2;
        const ticks = [];

        for (let i = 0; i <= countTicksInDay; i++) {
            const minute = this.calculateMinutesInTick(i);

            ticks.push({
                minute
            });
        }

        this.setState({
            ticks
        });
    }
}
