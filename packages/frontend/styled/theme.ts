import { WhiteSecondary, Azure } from './colors';
import { fontSizes, fontWeights } from './components/props/font';

const light = {
  bg: {
    accordion_content: 'transparent',
    secondary: '#f0f0f6',
    primary: WhiteSecondary['500'],
    card: '#fff',
  },
  text: {
    accordion_content: '#111',
    spinner: '#1e1e24',
    primary: '#111',
  },
};

const dark = {
  bg: {
    accordion_content: '#fdfdfd',
    primary: '#27293d',
    secondary: Azure['900'],
    card: '#27293d',
  },
  text: {
    accordion_content: '#111',
    spinner: '#fff',
    primary: '#fff',
  },
};

const defaultTheme = {
  fontSizes,
  fontWeights,
  lineHeights: {
    body: 1.5,
    heading: 1.3,
    code: 1.6,
  },
};

export const lightTheme = { ...defaultTheme, ...light };
export const darkTheme = { ...defaultTheme, ...dark };
