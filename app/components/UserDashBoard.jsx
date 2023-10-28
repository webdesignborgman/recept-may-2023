/** @format */

// 'use client';

import { useAuth } from '../firebase/AuthContext';
import { useRouter } from 'next/navigation';

export default function UserDashBoard() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  console.log(currentUser);
  return (
    <div className="max-w-md mx-auto text-gray-50">
      <div>UserDashBoard</div>
      <p>Username: {currentUser.displayName}</p>
      <p>Email: {currentUser.email}</p>
      <p>Email-verified: {currentUser.emailVerified ? 'Yes' : 'No'}</p>
      <p>resend verification mail:</p>
      <p>change password:</p>
      <div className="flex justify-center items-center">
        <button
          onClick={() => router.push('/recipecp')}
          className="w-3/4 mt-4 px-8 py-3 font-Large rounded-md dark:dark:bg-yellow-500 dark:dark:text-gray-900"
        >
          Recipe Control Panel
        </button>
      </div>

      <button
        onClick={logout}
        className="w-full mt-4 px-8 py-3 font-semibold rounded-md dark:dark:bg-yellow-500 dark:dark:text-gray-900"
      >
        logout
      </button>
    </div>
  );
}
