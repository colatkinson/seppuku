import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { render } from 'react-snapshot';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { sudokuApp } from './reduxFns';

let store = createStore(sudokuApp);

render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
