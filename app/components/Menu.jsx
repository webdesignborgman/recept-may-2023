/** @format */

'use client';

import { useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import { FaHamburger } from 'react-icons/fa';

import {
  IoHeartOutline,
  IoHomeOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoCloseOutline,
  IoBagAddOutline,
  IoCalendarOutline,
} from 'react-icons/io5';
import Link from 'next/link';

export default function Menu() {
  const { currentUser, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div onClick={openModal}>
        {currentUser ? (
          <button
            onClick={openModal}
            className="bg-gray-500 py-1 px-2 rounded text-gray-900 text-2xl mx-2 duration-300 hover:bg-yellow-500 hover:text-gray-900"
          >
            <FaHamburger />
          </button>
        ) : (
          <Link href="/user">
            <button className="bg-gray-700 py-1 px-3 rounded text-yellow-500 text-base mx-2 duration-300 hover:bg-yellow-500 hover:text-gray-700">
              Sign in
            </button>
          </Link>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-end z-10 bg-black bg-opacity-80 max-w-md w-full mx-auto">
          <div className="absolute top-24 right-0 flex flex-col h-100 p-2 w-64 bg-gray-700 text-gray-100">
            <div className="space-y-3 p-2">
              <div className="flex items-center justify-between">
                <h2>Menu</h2>

                <button
                  className="bg-gray-500 py-2 px-3 rounded text-gray-900 text-2xl mx-2 duration-300 hover:bg-yellow-500 hover:text-gray-900"
                  onClick={closeModal}
                >
                  <IoCloseOutline />
                </button>
              </div>

              <div className="flex-1">
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                  <li className="rounded-sm hover:bg-gray-800 bg-yellow-500">
                    <a
                      rel="noopener noreferrer"
                      href="/"
                      className="flex items-center p-2 space-x-3 rounded-md text-2xl"
                    >
                      <IoHomeOutline />
                      <span className="text-lg">Home</span>
                    </a>
                  </li>
                  <li className="rounded-sm hover:bg-gray-800">
                    <a
                      rel="noopener noreferrer"
                      href="/search"
                      className="flex items-center p-2 space-x-3 rounded-md text-2xl"
                    >
                      <IoSearchOutline />
                      <span className="text-lg">Search</span>
                    </a>
                  </li>

                  <li className="rounded-sm">
                    <a
                      rel="noopener noreferrer"
                      //   href="#" hover:bg-gray-800
                      className="flex items-center p-2 space-x-3 rounded-md text-2xl text-gray-900 line-through"
                    >
                      <IoHeartOutline />
                      <span className="text-lg">Favorites</span>
                    </a>
                  </li>

                  <li className="rounded-sm hover:bg-red-800">
                    <a
                      rel="noopener noreferrer"
                      href="/groceries"
                      className="flex items-center p-2 space-x-3 rounded-md text-2xl text-white-500"
                    >
                      <IoBagAddOutline />
                      <span className="text-lg">Groceries</span>
                    </a>
                  </li>

                  <li className="rounded-sm">
                    <a
                      rel="noopener noreferrer"
                      //   href="#" hover:bg-gray-800
                      className="flex items-center p-2 space-x-3 rounded-md text-2xl text-gray-900 line-through"
                    >
                      <IoCalendarOutline />
                      <span className="text-lg">Weekmenu</span>
                    </a>
                  </li>

                  <li className="rounded-sm hover:bg-gray-800">
                    <a
                      rel="noopener noreferrer"
                      href="/user"
                      className="flex items-center p-2 space-x-3 rounded-md text-2xl"
                    >
                      <IoPersonOutline />
                      <span className="text-lg">User dashboard</span>
                    </a>
                  </li>
                  <li onClick={logout} className="rounded-sm hover:bg-gray-800">
                    <a
                      rel="noopener noreferrer"
                      className="flex items-center p-2 space-x-3 rounded-md text-2xl cursor-pointer"
                    >
                      <IoLogOutOutline />
                      <span className="text-lg">Logout</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </>
  );
}
