import styled from 'styled-components';
import { Container } from '@styled/div';
import BGImage from '@images/space.jpg';

export const NotFoundSection = styled(Container)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 4rem 0 10rem;
`;

export const Heading = styled.h1`
  font-size: 230px;
  margin: 0px;
  font-weight: 900;
  background: #fdfdfd;
  background: url(${BGImage}) no-repeat;
  background-size: cover;
  background-position: center;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  @media (max-width: 686px) {
    font-size: 180px;
  }

  @media (max-width: 520px) {
    font-size: 150px;
  }

  @media (max-width: 430px) {
    font-size: 120px;
  }

  @media (max-width: 340px) {
    font-size: 100px;
  }

  @media (max-width: 285px) {
    font-size: 80px;
  }
`;

export const Heading2 = styled.h2`
  font-size: 30px;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 1rem;

  @media (max-width: 430px) {
    font-size: 25px;
  }

  @media (max-width: 340px) {
    font-size: 20px;
  }

  @media (max-width: 285px) {
    font-size: 17px;
  }
`;

export const Paragraph = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;
  margin-top: 1rem;
  text-align: center;

  @media (max-width: 430px) {
    font-size: 14px;
  }

  @media (max-width: 285px) {
    font-size: 13px;
  }
`;

export const StyledLink = styled.a`
  background: #456ba9;
  line-height: 2;
  font-size: 16px;
  letter-spacing: 0.5px;
  font-weight: 400;
  margin-top: 1rem;
  padding: 0.7rem 3rem;
  text-decoration: none;
  text-transform: uppercase;
  color: #fff;
`;
