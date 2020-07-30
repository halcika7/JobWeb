import styled, { css } from 'styled-components';
import { BaseButton, HeightWidth } from '@styled';

export const Wrapper = styled.section`
  height: 100%;
`;

export const AccordionElement = styled.section<{ margin?: string }>`
  height: 45px;
  overflow: hidden;
  transition: height 0.3s ease-in-out;

  ${props =>
    props.margin &&
    css`
      margin: ${props.margin};
    `}
`;

export const Button = styled(BaseButton)`
  ${HeightWidth('45px', '100%')}
  padding: 0 1rem;
  background: #41b8ed;
  color: #fdfdfd;

  svg {
    ${HeightWidth('24px', '24px')}
    margin-left: auto;

    path {
      fill: #fdfdfd;
    }
  }
`;

export const Content = styled.div`
  padding: 1.5rem 1rem;
  color: ${props => props.theme.text.accordion_content};
  background: ${props => props.theme.bg.accordion_content};
`;

export const Paragraph = styled.p`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
