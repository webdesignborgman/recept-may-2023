/** @format */

'use client';

import { FaSearch, FaHamburger } from 'react-icons/fa';
import Link from 'next/link';
import { useAuth } from '../firebase/AuthContext';
import Menu from './Menu';

export default function Nav({ openModal }) {
  const { currentUser, logout } = useAuth();

  return (
    <div className="flex bg-gray-500 p-6 text-yellow-500 text-xl items-center justify-between gap-3 my-6 rounded max-w-md mx-auto">
      <div>
        <Link href="/search/">
          <button>
            <FaSearch />
          </button>
        </Link>
      </div>
      <div className="text-lg text-gray-900">
        {currentUser ? 'Welcome ' + currentUser.displayName : ''}
      </div>
      <div>
        {currentUser ? (
          <button
            onClick={openModal}
            className="bg-gray-500 py-2 px-3 rounded text-gray-900 text-2xl mx-2 duration-300 hover:bg-yellow-500 hover:text-gray-900"
          >
            <Menu />
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
