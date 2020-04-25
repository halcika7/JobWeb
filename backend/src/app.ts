import express, { Response, Request, NextFunction } from 'express';
import path from 'path';

import compression from 'compression';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';
import session from 'express-session';
import helmet from 'helmet';
import hpp from 'hpp';

import passport from 'passport';
import { Configuration } from '@config/AppConfig';
import { connect } from '@config/db-connect';
import router from '@router';

// Create Express server
const app = express();

// Express configuration
app.use(cookieparser());
app.use(cors({ origin: Configuration.appConfig.url, credentials: true }));
app.use(
  express.urlencoded({
    extended: false,
    limit: '1kb',
    parameterLimit: 10,
  })
);

app.use(express.json({ limit: '1kb' }));

app.use(compression());
app.use(helmet());
app.use(hpp());
app.use(
  session({
    secret: Configuration.appConfig.cookie.COOKIE_SECRET,
    cookie: { httpOnly: true, sameSite: true, path: '/' },
    resave: false,
    saveUninitialized: false,
    rolling: true,
    name: 'ses',
  })
);

app.use(csrf({ cookie: false }));

app.all('*', (req, res: Response, next) => {
  res.cookie('_csrf', req.csrfToken(), { sameSite: true });
  return next();
});

app.use('/api', router);

app.set('env', Configuration.appConfig.environment);
app.set('port', Configuration.appConfig.server.PORT || 5000);

app.use(passport.initialize());

connect();

// Serve static assets in production
if (Configuration.appConfig.environment === 'production') {
  // Set static folder
  app.use(express.static(path.resolve(__dirname, '../../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
  });
}

// eslint-disable-next-line max-params
app.use((err: any, req: Request, res: Response, _: NextFunction) => {
  console.log('err', typeof err);
  if (err?.code !== 'EBADCSRFTOKEN') return _(err);
  console.log('err', err);

  return res.status(403).json({
    message: 'Someone tempered this request. CSRF token was not provided.',
  });
});

export default app;
