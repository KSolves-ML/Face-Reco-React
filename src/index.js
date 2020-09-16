import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouteComponent from './routes/routes.js';

import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <RouteComponent />
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
