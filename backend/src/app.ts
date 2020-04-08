import compression from 'compression'; // compresses requests
import cookieparser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import passport from 'passport';
import path from 'path';
import 'reflect-metadata';
import { Configuration } from './config/AppConfig';
import router from './routes';
import { connect } from './config/db-connect';

// Create Express server
const app = express();

// Express configuration
app.use(cookieparser(Configuration.appConfig.cookie.COOKIE_SECRET));
app.use(cors({ origin: Configuration.appConfig.url, credentials: true }));
app.use(express.urlencoded({ extended: true, limit: '1kb' }));
app.use(express.json({ limit: '1kb' }));

app.use(compression());
app.use(helmet());
app.use(hpp());

app.set('env', Configuration.appConfig.environment);
app.set('port', Configuration.appConfig.server.PORT || 5000);

app.use(passport.initialize());

app.use('/api', router);

connect();

// Serve static assets in production
if (Configuration.appConfig.environment === 'production') {
  // Set static folder
  app.use(express.static(path.resolve(__dirname, '../../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
  });
}

export default app;
