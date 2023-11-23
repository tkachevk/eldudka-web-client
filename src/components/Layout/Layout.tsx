import React from 'react';
import { Header, Categories, ShoppingCart, FavoritesModal, MobileMenu, Footer } from '../Layout';

const Layout = ({ children }) => {
  return (
    <div style={{ background: '#fbfbfb' }}>
      <Header />
      <Categories />
      <ShoppingCart />
      <FavoritesModal />
      <MobileMenu />
      {children}
      <Footer />
    </div>
  );
};

export { Layout };
