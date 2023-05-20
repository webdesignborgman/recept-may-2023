/** @format */

// 'use client';

import { useAuth } from '../firebase/AuthContext';

export default function UserDashBoard() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="">
      <div>UserDashBoard</div>
      <p>Username: {currentUser.displayName}</p>
      <p>Email: {currentUser.email}</p>
      <p>Email-verified: {currentUser.emailVerified ? 'Yes' : 'No'}</p>
      <button
        onClick={logout}
        className="w-full px-8 py-3 font-semibold rounded-md dark:dark:bg-yellow-500 dark:dark:text-gray-900"
      >
        logout
      </button>
    </div>
  );
}
