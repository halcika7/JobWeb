import { WhiteSecondary, Azure } from './colors';

// Theme.ts
const light = {
  bg: {
    accordion_content: 'transparent',
    secondary: '#f0f0f6',
    primary: WhiteSecondary['500'],
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
    primary: '#030B18',
    secondary: Azure['900'],
  },
  text: {
    accordion_content: '#111',
    spinner: '#fff',
    primary: '#fff',
  },
};

const defaultTheme = {
  fontSizes: [
    '14px', // 0
    '16px', // 1
    '18px', // 2
    '22px', // 3
    '26px', // 4
    '32px', // 5
    '40px', // 6
  ],
  fontWeights: {
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
