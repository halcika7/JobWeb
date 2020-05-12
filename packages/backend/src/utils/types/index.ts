import { Token } from './UserTypes';

export * from './ResponseTypes';
export * from './UserTypes';
export * from './ContactTypes';

export type Controller = InstanceType<any>;
export interface UserRequest extends Request {
  user?: Token;
}
