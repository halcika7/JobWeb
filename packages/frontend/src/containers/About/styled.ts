import styled from 'styled-components';
import { Row, CenterDiv, AlignCenterDiv, Flex } from '@styled/div';
import { CenterAllFlex } from '@styled/props/flex';
import { GridColumnsGap, GridColumns } from '@styled/props/grid';
import { HeightWidth } from '@styled/props/height';
import MapImg from '@images/google-map.png';

export const AboutSection = styled.section`
  padding: 4rem 0;
`;

export const Intro = styled(Row)`
  padding: 4rem 0 6rem;
  background: url(${MapImg});
  background-position: center center;
  background-repeat: no-repeat;
  justify-content: center;
  text-align: center;
`;

export const IntroHeading = styled.h1`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 2rem;

  @media (max-width: 991px) {
    font-size: ${props => props.theme.fontSizes.h2};
  }

  @media (max-width: 576px) {
    font-size: ${props => props.theme.fontSizes.h4};
  }
`;

export const IntroParagraph = styled.p`
  margin-bottom: 3rem;
  font-size: ${props => props.theme.fontSizes.h4};
  font-weight: 300;
  line-height: 1.7;

  @media (max-width: 991px) {
    font-size: ${props => props.theme.fontSizes.h5};
  }

  @media (max-width: 576px) {
    font-size: ${props => props.theme.fontSizes.paragraph};
  }
`;

export const IntroImg = styled.img`
  max-width: 100%;
  height: auto;
  display: unset;
`;

// about icons
export const Icons = styled.section`
  ${GridColumnsGap(3, 3)}
  padding: 4rem 0;

  @media (max-width: 991px) {
    ${GridColumnsGap(3, 2.5)}
  }

  @media (max-width: 767px) {
    ${GridColumnsGap(1, 3)}
  }
`;

export const GridItem = styled(CenterDiv)`
  flex-direction: column;
  padding: 2rem 3rem;
  text-align: center;
  border-bottom: 1px solid #41b8ed;
  box-shadow: 2px 3px 12px rgb(0, 0, 0, 0.1);
  background: ${props => props.theme.bg.card};

  @media (max-width: 991px) {
    padding: 2rem 1.5rem;
  }

  &:hover {
    background: #41b8ed;
    color: #fdfdfd;
  }
`;

export const Icon = styled(CenterDiv)`
  ${HeightWidth('60px', '60px')}
  border: 1px solid ${props => props.theme.text.primary};
  border-radius: 50%;
  margin-bottom: 1rem;

  svg {
    height: 35px;
    width: 35px;
    * {
      fill: ${props => props.theme.text.primary};
      stroke: ${props => props.theme.text.primary} !important;
    }
  }
`;

export const IconsHeading = styled.h3`
  font-size: ${props => props.theme.fontSizes.h5};
  line-height: 21.6px;
  text-align: center;
  margin-bottom: 1rem;
`;

export const IconsParagraph = styled.p`
  font-size: ${props => props.theme.fontSizes.helper};
  font-weight: 300;
  line-height: 23.8px;
  text-align: center;
`;

// about ex
export const AboutExSection = styled.section`
  padding: 4rem 0;
`;

export const AboutExHeading = styled.h3`
  font-size: ${props => props.theme.fontSizes.h4};
  font-weight: 700;
  line-height: 22px;
  text-transform: uppercase;
  margin-bottom: 2rem;
`;

export const AboutExContent = styled.div`
  @media (max-width: 991px) {
    &:first-child {
      margin-bottom: 4rem;
    }
  }
`;

export const AboutExParagraph = styled.p`
  font-size: ${props => props.theme.fontSizes.paragraph};
  line-height: 26px;

  &:nth-child(2) {
    margin-bottom: 3rem;
  }
`;

export const Checkboxes = styled.div`
  margin: 1.5rem 0 0;
`;

export const Checkbox = styled(AlignCenterDiv)`
  margin-bottom: 1rem;
`;

export const AboutExIcon = styled.div`
  ${HeightWidth('20px', '20px')}
  margin-right: 1rem;

  svg {
    ${HeightWidth('20px', '20px')}
    path {
      fill: #41b8ed;
    }
  }
`;

export const CheckboxParagraph = styled.p`
  margin: 0;
  font-size: ${props => props.theme.fontSizes.helper};
  font-weight: 500;
  line-height: 23px;
`;

// grid numbers
export const GridNumbers = styled.section`
  ${GridColumns(4)}
  padding: 4rem 0;

  @media (max-width: 991px) {
    ${GridColumnsGap(2, 2)}
  }

  @media (max-width: 575px) {
    ${GridColumns(1)}
  }
`;

export const GridNumber = styled(CenterDiv)`
  flex-direction: column;
  padding: 3rem 1rem;
  background: #41b8ed;
  color: #fdfdfd;

  &:nth-child(even) {
    background: #52bce1;
  }
`;

export const GridNumberParagraph = styled.p`
  font-family: Lato, sans-serif;
  font-size: ${props => props.theme.fontSizes.paragraph};
  font-weight: 500;
  line-height: 17.6px;
  margin-top: 1rem;

  &:first-child {
    ${CenterAllFlex}
    line-height: 23px;
    font-weight: 900;
    font-size: 50px;
    margin-bottom: 1rem;
    margin-top: 0;
  }

  svg {
    margin-left: 0.4rem;
    fill: #fdfdfd;
  }
`;

// about us
export const AboutUsSection = styled.section`
  ${GridColumns(2)}
  padding: 4rem 0;

  @media (max-width: 991px) {
    ${GridColumns(1)}
  }
`;

export const AboutUsContent = styled.div`
  padding-right: 1rem;

  @media (max-width: 991px) {
    margin-bottom: 2rem;
    padding: 0;
  }
`;

export const AboutUsHeading = styled.h3`
  font-size: ${props => props.theme.fontSizes.h4};
  font-weight: 700;
  line-height: 22px;
  text-transform: uppercase;
  margin-bottom: 2rem;
`;

export const AboutUsParagraph = styled.p`
  margin: 0;
  font-size: ${props => props.theme.fontSizes.paragraph};
  line-height: 26px;
  margin-bottom: 2rem;
`;

export const AboutUsIcons = styled(Flex)`
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const Flex2 = styled.div`
  flex: 2;
`;

export const AboutUsIcon = styled(AlignCenterDiv)`
  margin-bottom: 1rem;

  svg {
    margin-right: 1rem;

    path {
      fill: #41b8ed;
    }
  }
`;

export const AboutUsAccordion = styled.div`
  padding-left: 1rem;

  @media (max-width: 991px) {
    padding: 0;
  }
`;
