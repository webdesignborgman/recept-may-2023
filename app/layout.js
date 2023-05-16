/** @format */

'use client';

/** @format */

import { AuthProvider } from './firebase/AuthContext';

import './globals.css';
// import { Montserrat } from 'next/font/google';
import Header from './components/Header';
import Nav from './components/Nav';

// const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: "Borgman's kitchen companion",
  description:
    'This is an app for personal use in the Borgman household. Also its mainly for learning purposes in learning webdesign, next.js, Firebase adn tailwind.css',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        {/* 
      Add this back to body when fixed
      className={montserrat.className} */}
        <body>
          <Header />
          <Nav />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
