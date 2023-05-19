/** @format */

'use client';

/** @format */

import { AuthProvider } from './firebase/AuthContext';

import './globals.css';
<<<<<<< HEAD
=======
// import { Montserrat } from 'next/font/google';
>>>>>>> parent of 22f3e07 (fiddling wiht login)
import Header from './components/Header';
import Nav from './components/Nav';

<<<<<<< HEAD
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 
      Add this back to body when fixed
      className={montserrat.className} */}
      <body>
        <AuthProvider>
=======
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
>>>>>>> parent of 22f3e07 (fiddling wiht login)
          <Header />
          {/* <Nav /> */}
          {children}
<<<<<<< HEAD
          <Footer />
        </AuthProvider>
      </body>
=======
        </body>
      </AuthProvider>
>>>>>>> parent of 22f3e07 (fiddling wiht login)
    </html>
  );
}
