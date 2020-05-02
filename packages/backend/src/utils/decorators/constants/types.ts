import { RequestHandler, ErrorRequestHandler } from 'express';

export type MiddlewareType = RequestHandler;
export type ErrorMiddlewareType = ErrorRequestHandler;
export type WrapperFunction = (action: any) => any;
