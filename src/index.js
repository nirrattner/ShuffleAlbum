import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import registerServiceWorker from './registerServiceWorker';
import App from './js/App';

import './css/index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
