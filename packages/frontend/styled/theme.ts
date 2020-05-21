import { WhiteSecondary, Azure } from './colors';

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
  fontSizes: {
    copyright: '0.7em', // 12px
    helper: '0.8em', // 14px
    paragraph: '1em', // 16px
    h5: '1.1em', // 18px
    h4: '1.2em', // 20px
    h3: '1.4em', // 22px
    h2: '1.6em', // 25px
    h1: '1.8em', // 28px
  },
  fontWeights: {
    light: 300,
    body: 400,
    subheading: 500,
    link: 600,
    bold: 700,
    heading: 800,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.3,
    code: 1.6,
  },
};

export const lightTheme = { ...defaultTheme, ...light };
export const darkTheme = { ...defaultTheme, ...dark };
