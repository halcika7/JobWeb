import styled from 'styled-components';
import { Container } from '@styled/div';
import { BaseLink } from '@styled/link';

export const BreadcrumbDiv = styled.div`
  width: 100%;
  padding: 3rem 0;
  background: #4fbfe6;
`;

export const BredcrumbContainer = styled(Container)`
  display: flex;
`;

export const Anchor = styled(BaseLink)`
  color: #27293d;
  transition: color 0.2s ease-in-out;
  font-weight: 400;
  font-size: 18px;
  font-family: Poppins, sans-serif;

  &:hover {
    color: #88454f;
  }

  svg {
    color: #27293d;
    margin: 0 0.4rem;
  }

  &:last-child {
    pointer-events: none;
  }
`;

// body.light {
//     .breadcrumb {
//       background: #1e2538;
//       a {
//         color: #fdfdfd;

//         &:hover {
//           color: #f16a68;
//         }

//         svg {
//           color: #fdfdfd;
//         }
//       }
//     }
//   }
