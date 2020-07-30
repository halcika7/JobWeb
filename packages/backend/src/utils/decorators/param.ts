import { RouteParamtypes } from './constants/enums';
import { createRouteParamDecorator } from './helpers/createRouteParamDecorator';

export const Req: () => ParameterDecorator = createRouteParamDecorator(
  RouteParamtypes.REQUEST
);

export const Res: () => ParameterDecorator = createRouteParamDecorator(
  RouteParamtypes.RESPONSE
);

export const Next: () => ParameterDecorator = createRouteParamDecorator(
  RouteParamtypes.NEXT
);

export const Ip: () => ParameterDecorator = createRouteParamDecorator(
  RouteParamtypes.IP
);

export const Session: () => ParameterDecorator = createRouteParamDecorator(
  RouteParamtypes.SESSION
);

export const Cookie: (
  cookieName?: string
) => ParameterDecorator = createRouteParamDecorator(RouteParamtypes.COOKIE);

/** @File() file */
export const File: (
  fileKey?: string
) => ParameterDecorator = createRouteParamDecorator(RouteParamtypes.FILE);

/** @Files() files */
export const Files: () => ParameterDecorator = createRouteParamDecorator(
  RouteParamtypes.FILES
);

export const Headers: (
  property?: string
) => ParameterDecorator = createRouteParamDecorator(RouteParamtypes.HEADERS);

/** @Query('user') user: string */
/** @Query() user: string */
// export function Query(property?: string): ParameterDecorator {
//   return createRouteParamDecorator(RouteParamtypes.QUERY)(property);
// }

/** @Body('role') role: string */
/** @Body() body: string */
export function Body(property?: string): ParameterDecorator {
  return createRouteParamDecorator(RouteParamtypes.BODY)(property);
}

/**
 * findOne(@Param() params: string[])
 * findOne(@Param('id') id: string)
 */
// export function Param(property?: string): ParameterDecorator {
//   return createRouteParamDecorator(RouteParamtypes.PARAM)(property);
// }
