/** @format */

import Footer from './components/Footer';
import Header from './components/Header';
import Nav from './components/Nav';
import { AuthProvider } from './firebase/AuthContext';
import './globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Kitchen companion',
  description:
    'Private app for the Borgman family to store recipes, groceries list and weekmenu',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <Nav />
          {children}
          <Analytics/>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
