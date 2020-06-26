import React, { Component } from 'react';
import { AuthToken, store, CookieService, Actions } from '@job/redux';
import ServerCookie from 'next-cookies';
import { NextPageContext } from 'next';

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
        store.dispatch(Actions.loginSuccess(true, role));
      }

      return new AuthToken(token);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
