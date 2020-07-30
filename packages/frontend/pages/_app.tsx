import React, { ReactNode, useEffect, FC } from 'react';
import App, { AppContext, AppInitialProps } from 'next/app';
import ErrorBoundary from '@components/ErrorBoundary';
import Layout from '@components/Layout';
import ServerCookie from 'next-cookies';

import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';

import Providers from 'styled/Providers';
import { GlobalStyle } from 'styled/global';
import { AnimatePresence } from 'framer-motion';

import {
  AuthToken,
  CookieService,
  useThunkDispatch,
  Actions,
  wrapper,
} from '@job/redux';

import '../src/util/axios';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const ScrollToTop = ({ children }: any) => {
  const router = useRouter();
  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      // just a fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, [router.asPath]);

  return children;
};

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useThunkDispatch();

  useEffect(() => {
    if (CookieService.getToken()) {
      const token = new AuthToken(CookieService.getToken());
      if (token.isExpired) {
        dispatch(Actions.refreshToken);
      } else {
        dispatch(
          Actions.loginSuccess(true, AuthToken.getRole(token.token as string))
        );
      }
    }
  }, [dispatch]);

  return <ScrollToTop>{children}</ScrollToTop>;
};

// export default withRouter(ScrollToTop);

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
    const { Component, pageProps, router } = this.props;

    return (
      <ErrorBoundary>
        <Wrapper>
          <Providers>
            <GlobalStyle />
            <Layout isServerAuth={pageProps.isServerAuth}>
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.asPath} />
              </AnimatePresence>
            </Layout>
          </Providers>
        </Wrapper>
      </ErrorBoundary>
    );
  }
}

export default wrapper.withRedux(MyApp);
