type fontSizeT =
  | 'copyright'
  | 'helper'
  | 'paragraph'
  | 'h5'
  | 'h4'
  | 'h3'
  | 'h2'
  | 'h1';

type fontWeighT =
  | 'light'
  | 'body'
  | 'subheading'
  | 'link'
  | 'bold'
  | 'heading'
  | 'bolder';

type fontSizesI = {
  [key in fontSizeT]: string;
};

type fontWeightsI = {
  [key in fontWeighT]: number;
};

export const fontSizes: fontSizesI = {
  copyright: '0.7em', // 12px
  helper: '0.8em', // 14px
  paragraph: '1em', // 16px
  h5: '1.1em', // 18px
  h4: '1.2em', // 20px
  h3: '1.4em', // 22px
  h2: '1.6em', // 25px
  h1: '1.8em', // 28px
} as fontSizesI;

export const fontWeights: fontWeightsI = {
  light: 300,
  body: 400,
  subheading: 500,
  link: 600,
  bold: 700,
  heading: 800,
  bolder: 900,
};

export const setFontOptions = (
  size: fontSizeT,
  weight: fontWeighT = 'body'
) => ({
  'font-size': fontSizes[`${size}` as fontSizeT],
  'font-weight': fontWeights[`${weight}` as fontWeighT],
});

export const textProps = (align: string, transform = 'none') => ({
  'text-align': align,
  'text-transform': transform,
});
