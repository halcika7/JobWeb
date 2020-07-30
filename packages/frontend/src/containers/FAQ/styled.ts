import styled from 'styled-components';
import { GridColumnsPerc, BaseButton, Container } from '@styled';

// section
export const FaqSection = styled(Container)`
  ${GridColumnsPerc('30% 70%')}
  margin: 5rem auto 10rem;

  @media (max-width: 767px) {
    ${GridColumnsPerc('100%')}
  }
`;

export const FormWrapper = styled.div`
  padding-right: 2rem;

  @media (max-width: 991px) {
    padding-right: 1rem;
  }

  @media (max-width: 767px) {
    padding-right: 0;
    margin-bottom: 5rem;
    width: 100%;
  }
`;

export const FormButton = styled(BaseButton)`
  font-size: ${props => props.theme.fontSizes.paragraph};
  line-height: 21px;
  margin-top: 2rem;
  padding: 0.625rem 4rem;
  background: #456ba9;
  border: 1px solid #456ba9;
  color: #fdfdfd;
`;

export const Faqs = styled.div`
  padding-left: 2rem;

  @media (max-width: 991px) {
    padding-left: 1rem;
  }

  @media (max-width: 767px) {
    padding-left: 0;
    width: 100%;
  }
`;

export const Heading = styled.h1`
  margin: 0 0 5rem;
`;
