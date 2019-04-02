import './styles.css';
import * as React from 'react';
import { Calendar } from '../components/calendar';

class App extends React.Component {
    public render(): JSX.Element {
        return (
            <div className="App">
                <Calendar />
            </div>
        );
    }
}

export { App };
