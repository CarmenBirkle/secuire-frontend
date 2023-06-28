import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './fonts/poppins-v20-latin-regular.eot'; 
import './fonts/poppins-v20-latin-regular.eot?#iefix';
import './fonts/poppins-v20-latin-regular.woff2'; 
import './fonts/poppins-v20-latin-regular.woff'; 
import './fonts/poppins-v20-latin-regular.ttf'; 
import './fonts/poppins-v20-latin-regular.svg#Poppins';
import './fonts/poppins-v20-latin-700.eot'; 
import './fonts/poppins-v20-latin-700.eot?#iefix';
import './fonts/poppins-v20-latin-700.woff2'; 
import './fonts/poppins-v20-latin-700.woff'; 
import './fonts/poppins-v20-latin-700.ttf'; 
import './fonts/poppins-v20-latin-700.svg#Poppins';
import './fonts/poppins-v20-latin-900.eot'; 
import './fonts/poppins-v20-latin-900.eot?#iefix';
import './fonts/poppins-v20-latin-900.woff2'; 
import './fonts/poppins-v20-latin-900.woff'; 
import './fonts/poppins-v20-latin-900.ttf'; 
import './fonts/poppins-v20-latin-900.svg#Poppins';

import './i18n';
import { AppProvider } from './components/helperSites/AppContext';

//import "./web.config";

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
