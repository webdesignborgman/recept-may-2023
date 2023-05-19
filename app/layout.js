/** @format */

'use client';

//returned?

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

export const metadata = {
  title: "Borgman's kitchen companion",
  description:
    'This is an app for personal use in the Borgman household. Also its mainly for learning purposes in learning webdesign, next.js, Firebase adn tailwind.css',
};

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
