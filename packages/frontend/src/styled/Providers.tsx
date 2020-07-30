import React from 'react';
import { lightTheme, darkTheme, ThemeProvider } from '@job/styled';
import useDarkMode from 'use-dark-mode';

export default ({ children }: any) => {
  const { value } = useDarkMode(false, {
    storageKey: undefined,
    onChange: undefined,
  });
  const theme = value ? darkTheme : lightTheme;

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (!localStorage.getItem('themeMode')) {
      localStorage.setItem('themeMode', JSON.stringify(false));
    }
    setMounted(true);
  }, []);

  const body = <ThemeProvider theme={theme}>{children}</ThemeProvider>;

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>;
  }

  return body;
};
