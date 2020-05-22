import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme';
import useDarkMode from 'use-dark-mode';

export default ({ children }: any) => {
  const { value } = useDarkMode(false, {
    storageKey: undefined,
    onChange: undefined,
  });
  const theme = value ? darkTheme : lightTheme;

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const body = <ThemeProvider theme={theme}>{children}</ThemeProvider>;

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>;
  }

  return body;
};
