export const Flex = { display: 'flex' };

const justifyCenter = { 'justify-content': 'center' };
const alignCenter = { 'align-items': 'center' };

export const CenterAllFlex = {
  ...Flex,
  ...justifyCenter,
  ...alignCenter,
};

export const AlignCenterFlex = {
  ...Flex,
  ...alignCenter,
};

export const JustifyCenterFlex = {
  ...Flex,
  ...justifyCenter,
};

export const FlexRow = {
  ...Flex,
  'flex-wrap': 'wrap',
  'margin-right': '-15px',
  'margin-left': '-15px',
};

export const SetAllFlex = (d: string, a: string, j: string) => ({
  display: 'flex',
  'flex-direction': d,
  'align-items': a,
  'justify-content': j,
});
