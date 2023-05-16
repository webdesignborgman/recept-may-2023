/** @format */
'use client';

import { useContext, useEffect } from 'react';
import { AuthContext } from '../../firebase/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page if user is not authenticated
    if (!currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

  return (
    <div>
      {currentUser ? (
        <>
          <h1 className="text-xl">User Dashboard</h1>
          <p>Username: {currentUser.displayName}</p>
          <p>Email: {currentUser.email}</p>
        </>
      ) : null}
    </div>
  );
}
