import jwt_decode from 'jwt-decode';

// types
import { Role } from '@pages/Auth/store/types';

export class TokenDecode {
  static getRole = (token: string): Role => {
    const { role }: { role: Role } = jwt_decode(token);
    return role;
  };
}
