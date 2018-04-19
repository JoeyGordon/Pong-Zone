import React from 'react';
import ReactDOM from 'react-dom';
import {createStore } from 'redux';
import * as firebase from 'firebase';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

import pongZone from './rootReducer';

const store = createStore(pongZone);

console.log(store.getState());

ReactDOM.render(<App />, global.document.getElementById('root'));
registerServiceWorker();
