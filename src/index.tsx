import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './app';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import pongZone from './rootReducer';

declare global {
  namespace NodeJS {
    interface Global { document: any }
  }
  interface Window { __REDUX_DEVTOOLS_EXTENSION__: any }
}

const store = createStore(
  pongZone,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<Provider store={store}><App /></Provider>, global.document.getElementById('root'));
registerServiceWorker();
