import React from 'react'
import { NavbarNested } from '../NavbarNested';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <NavbarNested />

      <main style={{ flex: 1, padding: '1rem', overflow: 'auto' }}>
        {children}
      </main>
    </div>
  );
}

export default Layout