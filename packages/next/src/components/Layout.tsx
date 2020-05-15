import React, { FC, ReactNode } from 'react';
import Navbar from '@components/navbar';
import Footer from '@components/footer';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
