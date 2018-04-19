import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, global.document.getElementById('root'));
registerServiceWorker();
