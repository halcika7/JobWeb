import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import ErrorBoundary from './components/ErrorBoundary';

// providers
import { CookiesProvider } from 'react-cookie';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import store from './store/index';

import './index.scss';

const app = (
  <HelmetProvider>
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </Router>
      </Provider>
    </ErrorBoundary>
  </HelmetProvider>
);

const root = document.getElementById('root') as HTMLDivElement;

ReactDOM.render(app, root);

serviceWorker.register();
