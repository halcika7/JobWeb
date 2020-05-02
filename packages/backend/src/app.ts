import * as controllers from '@controller/index';
import * as injectableServices from '@service/index';
import { RedisService } from '@service/Redis';

import { Server } from '@config/server-config';

import {
  Response,
  Request,
  NextFunction,
  urlencoded,
  json,
  static as expressStatic,
} from 'express';
import { resolve } from 'path';

import compression from 'compression';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';
import session from 'express-session';
import connectRedis from 'connect-redis';
import helmet from 'helmet';
import hpp from 'hpp';

import { LoggerFactory, Logger } from '@logger';
import { initialize } from 'passport';
import { Configuration } from '@env';
import { connect } from './configs/db-connect';
import { container } from 'tsyringe';

class App extends Server {
  private readonly port = Configuration.appConfig.server.PORT;

  private readonly env = Configuration.appConfig.environment;

  private readonly logger = LoggerFactory.getLogger(App.name) as Logger;

  constructor() {
    super();

    this.setAppMiddlewares();
    this.setCsrf();

    connect();

    this.setupControllers();
    this.setupServices();
  }

  private setAppMiddlewares(): void {
    this.app.disable('x-powered-by');

    const RedisStore = connectRedis(session);

    this.app.use([
      session({
        store: new RedisStore({ client: RedisService.client }),
        secret: Configuration.appConfig.cookie.COOKIE_SECRET,
        cookie: { httpOnly: true, sameSite: true, path: '/' },
        resave: false,
        saveUninitialized: false,
        rolling: true,
        name: 'ses',
      }),
      csrf({ cookie: false }),
      initialize(),
      hpp(),
      helmet(),
      compression(),
      json({ limit: '1kb' }),
      urlencoded({ extended: false, limit: '1kb', parameterLimit: 10 }),
      cors({ origin: Configuration.appConfig.url, credentials: true }),
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

    Object.keys(controllers).forEach((name: any) => {
      const Controller = (controllers as any)[`${name}`];
      if (typeof Controller === 'function') {
        const inst = container.resolve(Controller);
        controllerInstances.push(inst);
      }
    });

    super.addControllers(controllerInstances);
  }

  private setupServices(): void {
    Object.keys(injectableServices).forEach((name: any) => {
      const Service = (injectableServices as any)[`${name}`];
      if (typeof Service === 'function') {
        container.resolve(Service);
      }
    });
  }

  public start(): void {
    // Serve static assets in production
    if (this.env === 'production') {
      // Set static folder
      this.app.use(expressStatic(resolve(__dirname, '../../frontend/build')));

      this.app.get('*', (_, res) => {
        res.sendFile(resolve(__dirname, '../../frontend/build', 'index.html'));
      });
    }

    // eslint-disable-next-line max-params
    this.app.use((err: any, __: Request, res: Response, _: NextFunction) => {
      console.log('err', typeof err);
      if (err.code !== 'EBADCSRFTOKEN') return _(err);
      console.log('err', err);

      return res.status(403).json({
        message: 'Someone tempered this request. CSRF token was not provided.',
      });
    });

    this.app.listen(this.port, () => {
      this.logger.info(
        `App is running at http://localhost:${this.port} in ${this.env} mode.`,
        'this.app.listen'
      );
    });
  }
}

export default App;
