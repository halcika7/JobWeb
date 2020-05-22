import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import Navbar from '@components/navbar';
import Footer from '@components/footer';

const Main = styled.main`
  padding-top: 5rem;
`;

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    <Main>{children}</Main>
    <Footer />
  </>
);

export default Layout;
