import { HttpVerbs } from '@job/common';

function helperForRoutes(
  httpVerb: string,
  path?: string | RegExp
): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    let routeProperties = Reflect.getOwnMetadata(propertyKey, target) || {};

    routeProperties = {
      httpVerb,
      // path: path === undefined ? '' : `/${path}`,
      path: `/${path}`,
      ...routeProperties,
    };

    Reflect.defineMetadata(propertyKey, routeProperties, target);

    return descriptor;
  };
}

// Method Decorators
// export function Checkout(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.CKECKOUT, path);
// }

// export function Copy(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.COPY, path);
// }

// export function Delete(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.DELETE, path);
// }

export function Get(path?: string | RegExp): MethodDecorator {
  return helperForRoutes(HttpVerbs.GET, path);
}

// export function Head(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.HEAD, path);
// }

// export function Lock(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.LOCK, path);
// }

// export function Merge(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.MERGE, path);
// }

// export function Mkactivity(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.MK_ACTIVITY, path);
// }

// export function Mkcol(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.MK_COL, path);
// }

// export function Move(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.MOVE, path);
// }

// export function MSearch(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.M_SEARCH, path);
// }

// export function Notify(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.NOTIFY, path);
// }

// export function Options(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.OPTIONS, path);
// }

export function Patch(path?: string | RegExp): MethodDecorator {
  return helperForRoutes(HttpVerbs.PATCH, path);
}

export function Post(path?: string | RegExp): MethodDecorator {
  return helperForRoutes(HttpVerbs.POST, path);
}

// export function Purge(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.PURGE, path);
// }

// export function Put(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.PUT, path);
// }

// export function Report(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.REPORT, path);
// }

// export function Search(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.SEARCH, path);
// }

// export function Subscribe(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.SUBSCRIBE, path);
// }

// export function Trace(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.TRACE, path);
// }

// export function Unlock(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.UNLOCK, path);
// }

// export function Unsubscribe(path?: string | RegExp): MethodDecorator {
//   return helperForRoutes(HttpVerbs.UNSUBSCRIBE, path);
// }
