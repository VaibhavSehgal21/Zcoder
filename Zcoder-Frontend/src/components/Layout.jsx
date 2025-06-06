
import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Nav />
      <div className="max-w-7xl mx-auto pt-20 px-6">
      <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;