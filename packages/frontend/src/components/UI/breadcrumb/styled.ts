import styled, {
  Container,
  FlexProp,
  BaseLink,
  setFontOptions,
} from '@job/styled';

export const BreadcrumbDiv = styled.div`
  width: 100%;
  padding: 2.5rem 0;
  background: #4fbfe6;
`;

export const BredcrumbContainer = styled(Container)`
  ${FlexProp}
`;

export const Anchor = styled(BaseLink)`
  ${setFontOptions('paragraph', 'subheading')}
  color: #27293d;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #fff;
  }

  svg {
    color: #27293d;
    margin: 0 0.4rem;
  }

  &:last-child {
    pointer-events: none;
  }
`;
