import bodyParser from 'body-parser';
import compression from 'compression'; // compresses requests
import dotEnv from 'dotenv';
import express from 'express';
import lusca from 'lusca';
import passport from 'passport';
import path from 'path';

dotEnv.config();

// Create Express server
const app = express();

// Express configuration
app.set('env', process.env.NODE_ENV);
app.set('port', process.env.PORT || 5000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: SESSION_SECRET,
//     store: new MongoStore({
//         url: mongoUrl,
//         autoReconnect: true
//     })
// }));
app.use(passport.initialize());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

// Serve static assets in production
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  console.log('path.resolve(__dirname,', path.resolve(__dirname, '../../frontend/build'))
  app.use(express.static(path.resolve(__dirname, '../../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
  });
}

export default app;