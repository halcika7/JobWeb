import React, { ReactNode, useEffect, FC } from 'react';
import App, { AppContext, AppInitialProps } from 'next/app';
import ErrorBoundary from '@components/ErrorBoundary';
import { wrapper } from '@store/index';
import Layout from '@components/Layout';
import ServerCookie from 'next-cookies';

import Router from 'next/router';
import NProgress from 'nprogress';

import { refreshToken, loginSuccess } from '@containers/Auth/store/actions';
import { useThunkDispatch } from '@store/AppThunkDispatch';

import Providers from '@styled/Providers';
import { GlobalStyle } from 'styled/global';
import { AuthToken } from '@shared/decode';
import { CookieService } from '@shared/cookie';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useThunkDispatch();

  useEffect(() => {
    if (CookieService.getToken()) {
      const token = new AuthToken(CookieService.getToken());
      if (token.isExpired) {
        dispatch(refreshToken);
      } else {
        dispatch(loginSuccess(true, AuthToken.getRole(token.token as string)));
      }
    }
  }, [dispatch]);

  return <>{children}</>;
};

class MyApp extends App<AppInitialProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : ({} as any);
    const token = ServerCookie(ctx).accessToken;
    const auth = new AuthToken(token);

    pageProps.isServerAuth = !auth.isExpired;

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ErrorBoundary>
        <Wrapper>
          <Providers>
            <GlobalStyle />
            <Layout isServerAuth={pageProps.isServerAuth}>
              <Component {...pageProps} />
            </Layout>
          </Providers>
        </Wrapper>
      </ErrorBoundary>
    );
  }
}

export default wrapper.withRedux(MyApp);
