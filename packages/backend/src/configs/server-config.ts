import express, {
  Application,
  Request,
  Response,
  Router,
  NextFunction,
  ErrorRequestHandler,
  RequestHandler,
} from 'express';

import { ClassKeys } from '@decorator/constants/enums';

import { exchangeKeyForValue } from '@decorator/helpers/paramExchange';

import { ROUTE_ARGS_METADATA } from '@decorator/constants/constants';

type Controller = InstanceType<any>;

type RouterLib = (options?: any) => any;

interface InterfaceRouterAndPath {
  basePath: string | null;
  router: Router | null;
}

export class Server {
  private readonly _app: Application;

  constructor() {
    this._app = express();
  }

  protected get app(): Application {
    return this._app;
  }

  protected addControllers(
    ctrls: Controller | Controller[],
    routerLib?: RouterLib,
    globalMiddleware?: RequestHandler
  ): void {
    const controllers = ctrls instanceof Array ? ctrls : [ctrls];

    const routerLibrary = routerLib || Router;

    controllers.forEach((controller: Controller) => {
      const { basePath, router } = this.getRouter(routerLibrary, controller);
      if (basePath && router) {
        if (globalMiddleware) {
          this._app.use(basePath, globalMiddleware, router);
        } else {
          this._app.use(basePath, router);
        }
      }
    });
  }

  private wrapErrorMiddleware(
    errorMiddleware: ErrorRequestHandler,
    requestHandler: RequestHandler
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await requestHandler(req, res, next);
      } catch (error) {
        errorMiddleware(error, req, res, next);
      }
    };
  }

  private getCallback(controller: Controller, prototype: any, member: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      const metadata = Reflect.getMetadata(
        ROUTE_ARGS_METADATA,
        prototype,
        member
      );

      if (metadata) {
        const newValues: any[] = [];

        Object.keys(metadata).forEach((key: string) => {
          const data = exchangeKeyForValue(
            key.slice(0, -2),
            metadata[`${key}`].data,
            { req, res, next }
          );
          newValues.unshift(data);
        });

        return controller[`${member}`](...newValues);
      }

      return controller[`${member}`](req, res, next);
    };
  }

  private setPaths(controller: Controller, prototype: any, router: any) {
    let members = Object.getOwnPropertyNames(controller);

    members = members.concat(Object.getOwnPropertyNames(prototype));

    // Add paths/functions to router-object
    members.forEach((member: string) => {
      const route = controller[`${member}`];
      const routeProperties = Reflect.getOwnMetadata(member, prototype);

      if (route && routeProperties) {
        const {
          routeMiddleware,
          routeErrorMiddleware,
          httpVerb,
          path,
          routeWrapper,
        } = routeProperties;

        let callBack = this.getCallback(controller, prototype, member);

        if (routeWrapper) {
          callBack = routeWrapper(callBack);
        }

        if (routeErrorMiddleware) {
          callBack = this.wrapErrorMiddleware(routeErrorMiddleware, callBack);
        }

        if (routeMiddleware) {
          router[`${httpVerb}`](path, routeMiddleware, callBack);
        } else {
          router[`${httpVerb}`](path, callBack);
        }
      }
    });
  }

  private getRouter(
    routerLibrary: RouterLib,
    controller: Controller
  ): InterfaceRouterAndPath {
    const prototype = Object.getPrototypeOf(controller);
    const options = Reflect.getOwnMetadata(ClassKeys.OPTIONS, prototype);
    // Set options
    const router = options ? routerLibrary(options) : routerLibrary();
    // Get base path
    const basePath = Reflect.getOwnMetadata(ClassKeys.BASE_PATH, prototype);

    if (!basePath) return { basePath: null, router: null };

    this.setPaths(controller, prototype, router);

    return { basePath, router };
  }
}
