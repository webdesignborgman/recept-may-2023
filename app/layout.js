/** @format */

'use client';

/** @format */

import { AuthProvider } from './firebase/AuthContext';

import './globals.css';
import { Poppins } from 'next/font/google';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';

const poppins = Poppins({
  weight: ['100', '200', '400'],
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        {/* 
      Add this back to body when fixed
      className={montserrat.className} */}
        <body className={poppins.className}>
          <Header />
          <Nav />
          {children}
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
