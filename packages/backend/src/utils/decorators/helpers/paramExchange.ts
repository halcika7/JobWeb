import { Request, Response, NextFunction } from 'express';
import { RouteParamtypes } from '@decorator/constants/enums';

export function exchangeKeyForValue(
  key: RouteParamtypes | string,
  data: string | object | any,
  { req, res, next }: { req: Request; res: Response; next: NextFunction }
) {
  switch (key) {
    case RouteParamtypes.NEXT:
      return next;
    case RouteParamtypes.REQUEST:
      return req;
    case RouteParamtypes.RESPONSE:
      return res;
    case RouteParamtypes.BODY:
      return data ? req.body[`${data}`] : req.body;
    case RouteParamtypes.PARAM:
      return data ? req.params[`${data}`] : req.params;
    case RouteParamtypes.QUERY:
      return data ? req.query[`${data}`] : req.query;
    case RouteParamtypes.HEADERS:
      return data ? req.headers[`${data}`] : req.headers;
    case RouteParamtypes.SESSION:
      return req.session;
    case RouteParamtypes.FILE:
      return (req as any)[data || 'file'];
    case RouteParamtypes.FILES:
      return (req as any).files;
    case RouteParamtypes.IP:
      return req.ip;
    case RouteParamtypes.RATE_LIMIT:
      return req.rateLimit;
    case RouteParamtypes.COOKIE:
      return data ? req.cookies[`${data}`] : req.cookies;
    default:
      return null;
  }
}
