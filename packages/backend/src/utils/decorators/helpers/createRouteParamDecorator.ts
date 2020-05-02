import { RouteParamtypes } from '../constants/enums';
import { ROUTE_ARGS_METADATA } from '../constants/constants';
import { assignMetadata } from './assignMetadata';

export function createRouteParamDecorator(paramtype: RouteParamtypes) {
  return (data?: object | string | number): ParameterDecorator => (
    target,
    key,
    index
  ) => {
    const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, target, key) || {};

    Reflect.defineMetadata(
      ROUTE_ARGS_METADATA,
      assignMetadata({ args, paramtype, index, data }),
      target,
      key
    );
  };
}
