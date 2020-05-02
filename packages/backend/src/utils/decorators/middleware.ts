import {
  MiddlewareType,
  ErrorMiddlewareType,
  WrapperFunction,
} from './constants/types';

// Middleware Decorator
function middlewareHelper<T>(middlewareName: string, middleware: T) {
  return (
    target: any,
    propertyKey?: string | symbol,
    descriptor?: PropertyDescriptor
  ) => {
    let routeProperties = Reflect.getOwnMetadata(propertyKey, target) || {};

    routeProperties = {
      [middlewareName]: middleware,
      ...routeProperties,
    };

    Reflect.defineMetadata(propertyKey, routeProperties, target);

    return descriptor;
  };
}

export function Middleware(
  middleware: MiddlewareType | MiddlewareType[]
): MethodDecorator {
  return middlewareHelper('routeMiddleware', middleware);
}

// Error Middleware Decorator
export function ErrorMiddleware(
  middleware: ErrorMiddlewareType
): MethodDecorator {
  return middlewareHelper('routeErrorMiddleware', middleware);
}

// Wrapper Decorator
export function Wrapper(wrapperFunction: WrapperFunction) {
  return middlewareHelper('routeWrapper', wrapperFunction);
}
