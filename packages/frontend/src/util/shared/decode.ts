import { Role } from '@containers/Auth/store/types';

import jwt_decode from 'jwt-decode';

export type DecodedToken = {
  readonly id: number | undefined;
  readonly exp: number;
  readonly role: Role;
};

export class AuthToken {
  readonly decodedToken: DecodedToken;

  constructor(readonly token?: string) {
    this.decodedToken = {
      id: undefined,
      exp: 0,
      role: { id: undefined, type: undefined },
    };
    try {
      if (token) this.decodedToken = jwt_decode(token);
    } catch (e) {
      this.decodedToken = {
        id: undefined,
        exp: 0,
        role: { id: undefined, type: undefined },
      };
    }
  }

  private expiresAt(): Date {
    return new Date(this.decodedToken.exp * 1000);
  }

  get isExpired(): boolean {
    return new Date() > this.expiresAt();
  }

  get isAuthenticated(): boolean {
    return !this.isExpired;
  }

  get authorizationString() {
    return `Bearer ${this.token}`;
  }

  static getRole = (token: string): Role => {
    const { role } = jwt_decode(token);

    return role;
  };
}
