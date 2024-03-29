import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from 'src/app';
import { layOutDay } from 'src/helpers/layOutDay';
import { mockEvents } from 'src/mockEvents';

declare let window: any;

ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
);

window.layOutDay = layOutDay;

((): void => {
    layOutDay(mockEvents);
})();
