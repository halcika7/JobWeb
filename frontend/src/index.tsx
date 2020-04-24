import React from 'react';
import ReactDOM from 'react-dom';
import App from 'pages/App';

// providers
import { CookiesProvider } from 'react-cookie';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// service worker
import * as serviceWorker from 'serviceWorker';

// store
import store from 'store/index';

// styles
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

const root = document.getElementById('root') as HTMLDivElement;

ReactDOM.render(app, root);

serviceWorker.register();
