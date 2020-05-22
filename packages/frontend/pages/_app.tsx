import React, { ReactNode, useEffect, FC } from 'react';
import App, { AppContext, AppInitialProps } from 'next/app';
import ErrorBoundary from '@components/ErrorBoundary';
import { wrapper } from '@store/index';
import Layout from '@components/Layout';

import Router from 'next/router';
import NProgress from 'nprogress';

import { refreshToken } from '@containers/Auth/store/actions';
import { useThunkDispatch } from '@store/AppThunkDispatch';
import { SessionStorage } from '@shared/sessionStorage';

import Providers from '@styled/Providers';
import { GlobalStyle } from 'styled/global';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useThunkDispatch();

  useEffect(() => {
    if (SessionStorage.getAuthenticated()) {
      dispatch(refreshToken);
    }
  }, [dispatch]);

  return <>{children}</>;
};

class MyApp extends App<AppInitialProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ErrorBoundary>
        <Wrapper>
          <Providers>
            <GlobalStyle />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Providers>
        </Wrapper>
      </ErrorBoundary>
    );
  }
}

export default wrapper.withRedux(MyApp);
