export const FlexProp = { display: 'flex' };

export const justifyCenter = { 'justify-content': 'center' };
export const alignCenter = { 'align-items': 'center' };

export const CenterAllFlex = {
  ...FlexProp,
  ...justifyCenter,
  ...alignCenter,
};

export const CenterAllFlexNative = {
  ...justifyCenter,
  ...alignCenter,
};

export const AlignCenterFlex = {
  ...FlexProp,
  ...alignCenter,
};

export const JustifyCenterFlex = {
  ...FlexProp,
  ...justifyCenter,
};

export const FlexRow = {
  ...FlexProp,
  'flex-wrap': 'wrap',
  'margin-right': '-15px',
  'margin-left': '-15px',
};

export const SetAllFlex = (d: string, a: string, j: string) => ({
  'flex-direction': d,
  'align-items': a,
  'justify-content': j,
});

export const SetAllFlexWithDisplay = (d: string, a: string, j: string) => ({
  ...FlexProp,
  ...SetAllFlex(d, a, j),
});
