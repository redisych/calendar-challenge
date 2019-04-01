import './styles.css';
import * as React from 'react';
import { Calendar } from 'src/components/calendar';

class App extends React.Component {
    public render(): JSX.Element {
        return (
            <div className="App">
                <Calendar />
            </div>
        );
    }
}

export default App;
