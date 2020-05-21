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
