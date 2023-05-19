/** @format */

'use client';

//returned?

import { AuthProvider } from './firebase/AuthContext';

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 
      Add this back to body when fixed
      className={montserrat.className} */}
      <body>{children}</body>
    </html>
  );
}
