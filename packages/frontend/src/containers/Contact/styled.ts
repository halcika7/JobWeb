import styled from 'styled-components';
import { Form } from 'formik';

export const ContactSection = styled.section`
  padding: 4rem 0;
`;

export const Heading = styled.h1`
  font-family: Poppins, sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 26.4px;
  text-align: center;
  margin-bottom: 2rem;
`;

export const ContactParagraph = styled.p`
  font-family: Poppins, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 23.8px;
  text-align: center;
`;

export const ContactForm = styled(Form)`
  max-width: 770px;
  margin: 6rem auto 0;
  padding: 4rem 2rem 5rem;
  border-bottom: 1px solid #41b8ed;
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);
  background: #27293d;
`;

export const SubmitButton = styled.button`
  font-family: Poppins, sans-serif;
  font-size: 14px;
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

export const IconsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 6rem;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 3rem;
  }
`;

export const GridIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  border: 1px solid #111;

  svg {
    height: 30px;
    width: 30px;

    g,
    path {
      fill: #111;
    }
  }
`;

export const GridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem 3rem;
  border: 1px solid transparent;
  height: 250px;
  border-bottom: 1px solid #41b8ed;
  background: #fdfdfd;

  @media (max-width: 1200px) {
    padding: 2rem 1.5rem;
  }

  @media (max-width: 991px) {
    padding: 2rem 5.5rem;
  }

  @media (max-width: 767px) {
    padding: 2rem 3rem;
  }

  @media (max-width: 270px) {
    padding: 2rem 1rem;
  }

  &:hover {
    background: #41b8ed;
    border: 1px solid #41b8ed;

    ${GridIcon} {
      background: #fdfdfd;
    }

    &:not(:first-child) {
      svg {
        g,
        path {
          fill: #1e2538;
        }
      }
    }
  }
`;

export const GridHeading = styled.h3`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-family: Poppins, sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.6px;
`;

export const GridParagraph = styled.p`
  font-family: Poppins, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  text-align: center;
`;

// body.light {
//     .contact {
//       .contact-icons-grid {
//         .grid-item {
//           .icon {
//             border: 1px solid #1e2538;
//           }

//           &:first-child {
//             svg {
//               g,
//               path {
//                 fill: transparent;
//               }
//             }
//           }

//           svg {
//             g,
//             path {
//               fill: #1e2538;
//             }
//           }

//           &:hover {
//             background: #41b8ed;
//             color: #fdfdfd;
//             border: 1px solid #41b8ed;

//             .icon {
//               border: 1px solid #f0f0f6;
//               background: #f0f0f6;
//             }
//           }
//         }
//       }
//     }
//   }
