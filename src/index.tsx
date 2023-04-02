import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import i18next from "./i18n";
import { I18nextProvider } from 'react-i18next';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <I18nextProvider i18n={i18next} >
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </I18nextProvider>
);
reportWebVitals();
