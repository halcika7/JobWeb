import App from 'App';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from 'serviceWorker';
import store from 'store/index';
import './index.scss';

const app = (
  <HelmetProvider>
    <Provider store={store}>
      <Router>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </Router>
    </Provider>
  </HelmetProvider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
