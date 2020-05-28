import Header from './Header';
import React from 'react';
import { Content } from 'carbon-components-react';
function Layout({ children }) {
  return (
    <div className="app">
      <Header />
      <Content>{children}</Content>
      <footer></footer>
    </div>
  );
}

export default Layout;
