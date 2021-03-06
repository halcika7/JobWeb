import * as controllers from '@controller/index';
import { RedisService } from '@service/Redis';

import { Server } from '@config/server-config';

import { Response, Request, NextFunction, urlencoded, json } from 'express';

import compression from 'compression';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';
import session from 'express-session';
import connectRedis from 'connect-redis';
import helmet from 'helmet';
import hpp from 'hpp';

import { LoggerFactory, Logger } from '@logger';
import passport from '@service/Passport';
import { Configuration } from '@env';
import { connect } from './configs/db-connect';

import { Server as HTTPServer } from 'http';

const { cookie, environment, url, server } = Configuration.appConfig;

class App extends Server {
  private readonly port = server.PORT;

  private readonly env = environment;

  private readonly logger = LoggerFactory.getLogger(App.name) as Logger;

  private server: HTTPServer | null = null;

  constructor() {
    super();

    this.setAppMiddlewares();
    this.setCsrf();

    connect();

    this.setupControllers();
  }

  private setAppMiddlewares(): void {
    this.app.disable('x-powered-by');

    const RedisStore = connectRedis(session);

    this.app.use([
      session({
        store: new RedisStore({ client: RedisService.client }),
        secret: cookie.COOKIE_SECRET,
        cookie: {
          httpOnly: true,
          path: '/',
          secure: environment === 'production',
        },
        resave: false,
        saveUninitialized: false,
        rolling: true,
        name: 'ses',
        proxy: environment === 'production',
      }),
      csrf({ cookie: false }),
      passport.initialize(),
      hpp(),
      helmet(),
      compression(),
      json({ limit: '1kb' }),
      urlencoded({ extended: false, limit: '1kb', parameterLimit: 10 }),
      cors({ origin: url, credentials: true }),
      cookieparser(),
    ]);
  }

  private setCsrf() {
    this.app.all('*', (req: Request, res: Response, next) => {
      res.cookie('_csrf', req.csrfToken(), { sameSite: true });
      return next();
    });
  }

  private setupControllers(): void {
    const controllerInstances: any[] = [];

    Object.keys(controllers).forEach((name: string) => {
      const Controller = (controllers as any)[`${name}`];
      if (typeof Controller === 'function') {
        controllerInstances.push(new Controller());
      }
    });

    super.addControllers(controllerInstances);
  }

  public start(): void {
    // eslint-disable-next-line max-params
    this.app.use(
      (err: Error | any, __: Request, res: Response, next: NextFunction) => {
        if (err.code !== 'EBADCSRFTOKEN') return next(err);

        return res.status(403).json({
          message:
            'Someone tempered this request. CSRF token was not provided.',
        });
      }
    );

    this.server = this.app.listen(this.port, () => {
      this.logger.info(
        `App is running at http://localhost:${this.port} in ${this.env} mode.`,
        'this.app.listen'
      );
    });
  }

  public async close() {
    return this.server?.close();
  }
}

export default App;
