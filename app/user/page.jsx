/** @format */
'use client';

import { useContext } from 'react';
import { AuthContext } from '../firebase/AuthContext.js';
import LoginForm from '../components/LoginForm';
import UserDashBoard from '../components/UserDashBoard';
import RegisterForm from '../components/RegisterForm';

export default function userPage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="">
      {!currentUser && <LoginForm />}
      {currentUser && <UserDashBoard />}
    </div>
  );
}
