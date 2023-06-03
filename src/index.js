import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './i18n';
import { AppProvider } from './components/helperSites/AppContext';

import "./web.config";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// for measuring performance in the app,
// to log results to the console during development,
// or send to an analytics endpoint. More: https://bit.ly/CRA-vitals
//TODO: in Production, deactivate
reportWebVitals(console.log);
// reportWebVitals();
