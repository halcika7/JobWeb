import styled from 'styled-components';
import { Container } from '@styled/div';

// section
export const FaqSection = styled(Container)`
  margin: 5rem auto 10rem;
  display: grid;
  grid-template-columns: 30% 70%;

  @media (max-width: 767px) {
    grid-template-columns: 100%;
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

export const FormButton = styled.button`
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  margin-top: 2rem;
  padding: 0.625rem 4rem;
  cursor: pointer;
  background: #456ba9;
  border: 1px solid #456ba9;
  color: #fdfdfd;
  outline: none;
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
