import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import ErrorBoundary from './components/ErrorBoundary';

// providers
import { CookiesProvider } from 'react-cookie';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import ReduxProvider from './store/provider';

import * as serviceWorker from './serviceWorker';

import './index.scss';

const app = (
  <HelmetProvider>
    <ReduxProvider>
      <Router>
        <CookiesProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </CookiesProvider>
      </Router>
    </ReduxProvider>
  </HelmetProvider>
);

const root = document.getElementById('root') || document.createElement('div');

ReactDOM.render(app, root);

serviceWorker.register();

export default app;
