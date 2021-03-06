import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import Navbar from '@components/navbar';
import Footer from '@components/footer';

const Main = styled.main`
  padding-top: 5rem;
  min-height: 100vh;
`;

const Layout: FC<{
  children: ReactNode;
  isServerAuth: boolean | undefined;
}> = ({ children, isServerAuth }) => (
  <>
    <Navbar isServerAuth={isServerAuth} />
    <Main>{children}</Main>
    <Footer />
  </>
);

export default Layout;
