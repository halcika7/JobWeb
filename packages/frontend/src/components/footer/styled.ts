import styled from 'styled-components';
import { CenterDiv } from '@styled/div';
import { CenterAllFlex, AlignCenterFlex } from '@styled/props/flex';
import { GridColumns, GridColumnsGap } from '@styled/props/grid';
import { HeightWidth } from '@styled/props/height';
import { setFontOptions, textProps } from '@styled/props/font';
import { BaseLink } from '@styled/link';

export const FooterWrapper = styled.footer`
  border-bottom: 2px solid #23c0e9;
  margin-top: auto;
  background: ${props => props.theme.bg.primary};
`;

export const TopContainer = styled(CenterDiv)`
  padding: 4rem 0;
`;

export const TopLink = styled(BaseLink)`
  ${setFontOptions('h4', 'subheading')}
  color: ${props => props.theme.text.primary};
  letter-spacing: 0.6px;
`;

export const TopSpan = styled.span`
  margin-left: 0.4rem;

  > span {
    color: #23c0e9;
    margin: 0 0.4rem;
  }
`;

export const TopImg = styled.img`
  height: 60px;
  object-fit: cover;
`;

export const MiddleContainer = styled.div`
  ${GridColumns(4)}
  padding: 4rem 0;
  border-top: 1px solid ${props => props.theme.text.primary};
  border-bottom: 1px solid ${props => props.theme.text.primary};

  @media (max-width: 992px) {
    ${GridColumnsGap(2, 5)}
  }

  @media (max-width: 600px) {
    ${GridColumnsGap(2, 3)}
  }

  @media (max-width: 500px) {
    ${GridColumnsGap(1, 3)}
  }
`;

export const GridItem = styled.div`
  padding-right: 2rem;

  @media (max-width: 992px) {
    padding-right: 1rem;
  }

  @media (max-width: 600px) {
    padding: 0;
  }
`;

export const Content = styled.div`
  p {
    ${setFontOptions('helper', 'subheading')}
    line-height: 20px;
    color: rgba(255, 255, 255, 0.85);
    word-spacing: 0px;
    margin-top: 1rem;
  }

  a {
    ${AlignCenterFlex}
    ${setFontOptions('helper', 'link')}
    letter-spacing: 1px;
    line-height: 23px;
    text-decoration: none;
    text-transform: uppercase;
    word-spacing: 0px;
    color: #23c0e9;
    margin-top: 1rem;

    svg {
      ${setFontOptions('paragraph')}
      margin-right: 0.3rem;
    }
  }
`;

export const Ul = styled.ul`
  padding: 1rem 0 0;
  margin: 0;
  list-style: none;

  li {
    ${AlignCenterFlex}
    padding: 0.6rem 0;

    svg {
      height: 20px;
      color: #f16a68;
      margin-right: 0.4rem;
    }
  }
`;

export const MiddleLink = styled.a`
  ${setFontOptions('paragraph', 'subheading')}
  text-transform: capitalize;
  word-spacing: 0px;
  color: ${props => props.theme.text.primary};

  &:hover {
    color: #f16a68;
  }
`;

export const Links = styled.div`
  display: flex;

  a {
    ${CenterAllFlex}
    ${HeightWidth('50px', '50px')}
    color: ${props => props.theme.text.primary};
    border-radius: 15px;
    transition: background 0.3s ease-in-out;

    &:not(:last-child) {
      margin-right: 1rem;
    }

    &:hover {
      color: #fff;

      &:first-child {
        background: #4267b2;
      }

      &:nth-child(2) {
        background: #1da1f2;
      }

      &:nth-child(3) {
        background: #0077b5;
      }

      &:nth-child(4) {
        background: #e4405f;
      }
    }
  }
`;

export const Heading3 = styled.h3`
  ${setFontOptions('h5')}
  ${textProps('start', 'uppercase')}
  line-height: 22px;
  color: #fff;
  white-space: normal;
  word-spacing: 0px;
`;

export const BottomContainer = styled(CenterDiv)`
  padding: 4rem 0;
  justify-content: space-between;
  flex-wrap: wrap-reverse;

  @media (max-width: 767px) {
    justify-content: center;

    ${Links} {
      margin-bottom: 2rem;
    }
  }
`;
