import React, { Component } from 'react';
import { AuthToken } from '@shared/decode';
import ServerCookie from 'next-cookies';
import store from '@store/index';
import { loginSuccess } from '@containers/Auth/store/actions';
import { NextPageContext } from 'next';
import { CookieService } from '@shared/cookie';

export type AuthProps = {
  auth: AuthToken;
};

export function hideAuthRoutes(WrappedComponent: any) {
  return class extends Component<AuthProps> {
    static async getInitialProps(ctx: NextPageContext) {
      const token = ServerCookie(ctx)[process.env.TOKEN_SECRET as string];
      const auth = new AuthToken(token);
      const initialProps = { auth };

      if (!auth.isExpired && ctx.res) {
        ctx.res.writeHead(302, {
          Location: '/',
        });
        ctx.res.end();
      }
      if (WrappedComponent.getInitialProps) {
        return WrappedComponent.getInitialProps(initialProps);
      }
      return initialProps;
    }

    get auth() {
      const {
        auth: { token },
      } = this.props;

      if (token) {
        CookieService.setToken(token);
        const role = AuthToken.getRole(token);
        store.dispatch(loginSuccess(true, role));
      }

      return new AuthToken(token);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
