/** @format */

'use client';

import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { useAuth } from '../firebase/AuthContext';

export default function Nav() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="flex bg-gray-500 p-6 text-yellow-500 text-2xl items-center justify-between gap-3 mx-2 my-6 rounded max-w-md mx-auto">
      <div>
        <Link href="/search/">
          <button>
            <FaSearch />
          </button>
        </Link>
      </div>
      <div>{currentUser ? 'Welcome ' + currentUser.displayName : ''}</div>
      <div>
        {currentUser ? (
          <button
            onClick={logout}
            className="bg-gray-700 py-1 px-3 rounded text-yellow-500 text-base mx-2 duration-300 hover:bg-yellow-500 hover:text-gray-700"
          >
            Logout
          </button>
        ) : (
          <Link href="/user">
            <button className="bg-gray-700 py-1 px-3 rounded text-yellow-500 text-base mx-2 duration-300 hover:bg-yellow-500 hover:text-gray-700">
              Sign in
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
