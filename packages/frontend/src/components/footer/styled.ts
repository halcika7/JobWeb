import styled from 'styled-components';
import { CenterDiv } from '@styled/div';
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
  color: ${props => props.theme.text.primary};
  font-family: Lato, sans-serif;
  font-weight: 400;
  letter-spacing: 0.6px;
  font-size: 20px;
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 4rem 0;
  border-top: 1px solid #ffffff1a;
  border-bottom: 1px solid #ffffff1a;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 5rem;
  }

  @media (max-width: 600px) {
    gap: 3rem;
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 3rem;
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
    font-family: Lato, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 23px;
    text-decoration: none solid rgba(255, 255, 255, 0.85);
    word-spacing: 0px;
    margin-top: 1rem;
  }

  a {
    font-family: Lato, sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 23px;
    text-decoration: none;
    text-transform: uppercase;
    word-spacing: 0px;
    color: #23c0e9;
    margin-top: 1rem;
    display: flex;
    align-items: center;

    svg {
      font-size: 16px;
      margin-right: 0.3rem;
    }
  }
`;

export const Ul = styled.ul`
  padding: 0;
  padding-top: 1rem;
  margin: 0;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    padding: 0.6rem 0;

    svg {
      height: 20px;
      color: #f16a68;
      margin-right: 0.4rem;
    }
  }
`;

export const MiddleLink = styled.a`
  font-family: Lato, sans-serif;
  font-size: 16px;
  font-weight: 400;
  text-transform: capitalize;
  word-spacing: 0px;
  color: ${props => props.theme.text.primary};
  text-decoration: none;

  &:hover {
    color: #f16a68;
  }
`;

export const BottomContainer = styled(CenterDiv)`
  padding: 4rem 0;
  justify-content: space-between;
  flex-wrap: wrap-reverse;

  @media (max-width: 647px) {
    justify-content: center;
  }
`;

export const Links = styled.div`
  display: flex;

  a {
    height: 50px;
    width: 50px;
    color: #fdfdfd;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    transition: background 0.3s ease-in-out;

    &:not(:last-child) {
      margin-right: 1rem;
    }

    &:hover {
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
  font-family: Montserrat, sans-serif;
  font-size: 20px;
  font-weight: 900;
  line-height: 22px;
  text-decoration: none solid rgb(255, 255, 255);
  text-align: start;
  text-transform: uppercase;
  white-space: normal;
  word-spacing: 0px;
`;

// body.light {
//     footer {
//       background: #fff;
//       border-bottom: 2px solid #366bf5;

//       .top {
//         a {
//           color: #27293d;

//           span.blue {
//             color: #366bf5;
//             margin: 0 0.4rem;
//           }
//         }
//       }

//       .middle {
//         border-top: 1px solid #27293d4c;
//         border-bottom: 1px solid #27293d4c;
//         .grid-item {
//           .content {
//             a {
//               color: #366bf5;
//             }
//           }
//           ul {
//             li {
//               a {
//                 color: #27293d;

//                 &:hover {
//                   color: #f16a68;
//                 }
//               }
//             }
//           }
//         }
//       }

//       .bottom {
//         .links {
//           a {
//             color: #27293d;

//             &:hover {
//               color: #fdfdfd;
//             }
//           }
//         }
//       }
//     }
//   }
