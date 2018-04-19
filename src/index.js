import React from 'react';
import ReactDOM from 'react-dom';
import {createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

import pongZone from './rootReducer';

const store = createStore(pongZone);

ReactDOM.render(<Provider store={store}><App /></Provider>, global.document.getElementById('root'));
registerServiceWorker();
