import React, { ReactNode, useEffect, FC } from 'react';
import App, { AppContext, AppInitialProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import ErrorBoundary from '@components/ErrorBoundary';
import { wrapper } from '@store/index';

import Router from 'next/router';
import NProgress from 'nprogress';

import '../index.scss';
import { refreshToken } from '@containers/Auth/store/actions';
import { useThunkDispatch } from '@store/AppThunkDispatch';
import { SessionStorage } from '@shared/sessionStorage';

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

  useEffect(() => {
    const parts = document.cookie.split('; ');
    let changed = false;

    parts.forEach(part => {
      const [name, value] = part.split('=');
      if (name === 'theme') {
        document.body.classList.value = value;
        changed = true;
      }
    });

    if (!changed) {
      document.body.classList.value = 'light';
    }
  }, []);

  return <>{children}</>;
};

class MyApp extends App<AppInitialProps> {
  state = {
    mounted: false,
  };

  static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    const { Component, pageProps } = this.props;

    if (!this.state.mounted) {
      return (
        <CookiesProvider>
          <ErrorBoundary>
            <Wrapper>
              <div style={{ visibility: 'hidden' }}>
                <Component {...pageProps} />
              </div>
            </Wrapper>
          </ErrorBoundary>
        </CookiesProvider>
      );
    }

    return (
      <CookiesProvider>
        <ErrorBoundary>
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </ErrorBoundary>
      </CookiesProvider>
    );
  }
}

export default wrapper.withRedux(MyApp);
