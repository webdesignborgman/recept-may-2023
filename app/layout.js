/** @format */

'use client';

/** @format */

import { AuthProvider } from './firebase/AuthContext';

import './globals.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 
      Add this back to body when fixed
      className={montserrat.className} */}
      <body>
        <AuthProvider>
          <Header />
          {/* <Nav /> */}
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
