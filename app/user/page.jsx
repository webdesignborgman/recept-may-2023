/** @format */

'use client';

import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import UserDashboard from '../components/UserDashBoard';
import { useAuth } from '../firebase/AuthContext';

export default function UserPage() {
  const [showRegister, setShowRegister] = useState(false);
  const { currentUser } = useAuth();

  const handleSignUpClick = () => {
    setShowRegister(true);
  };

  const handleBackToLogin = () => {
    setShowRegister(false);
  };

  return (
    <div>
      {currentUser ? (
        <UserDashboard />
      ) : showRegister ? (
        <Register onBackToLogin={handleBackToLogin} />
      ) : (
        <Login onSignUpClick={handleSignUpClick} />
      )}
    </div>
  );
}
