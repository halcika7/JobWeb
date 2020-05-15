import { Role } from '@containers/Auth/store/types';

import jwt_decode from 'jwt-decode';

export class TokenDecode {
  static getRole = (token: string): Role => {
    const { role } = jwt_decode(token);

    return role;
  };
}
