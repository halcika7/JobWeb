import styled from 'styled-components';
import { Container } from '@styled/div';
import { Flex } from '@styled/props/flex';
import { BaseLink } from '@styled/link';

export const BreadcrumbDiv = styled.div`
  width: 100%;
  padding: 2.5rem 0;
  background: #4fbfe6;
`;

export const BredcrumbContainer = styled(Container)`
  ${Flex}
`;

export const Anchor = styled(BaseLink)`
  color: #27293d;
  transition: color 0.2s ease-in-out;
  font-weight: 500;
  font-size: ${props => props.theme.fontSizes.paragraph};

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
