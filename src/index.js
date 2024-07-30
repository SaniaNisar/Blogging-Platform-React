// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './reduxStore/store'; // Default import
import App from './App'; // Your main App component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
