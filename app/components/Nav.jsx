/** @format */
'use client';

import { createContext, useContext } from 'react';
import { AuthContext } from '../firebase/AuthContext';
import { useRouter } from 'next/navigation';
import { signOutUser } from '../firebase/auth.js';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';

const styles = {
  container: `bg-gray-500 p-6`,
  title: `flex text-yellow-500 text-2xl items-center justify-between gap-3 mx-4`,
  button: `bg-gray-700 py-1 px-3 rounded text-yellow-500 text-base mx-2 duration-300 hover:bg-yellow-500 hover:text-gray-700`,
};
const handleLogout = () => {
  // This is a function component body, hooks can be used here
  signOutUser()
    .then(() => {
      console.log('Logout successful');
    })
    .catch((error) => {
      console.log('Logout failed: ', error.message);
    });
};
function Nav() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>
          {/* addsearch dir */}
          <Link href="/">
            <button>
              <FaSearch />
            </button>
          </Link>
        </div>
        {currentUser ? (
          <span className="text-xl">{`Welcome, ${currentUser.displayName}`}</span>
        ) : (
          <span></span>
        )}

        <div>
          {currentUser ? (
            <>
              <button className={styles.button} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link href="/user">
              <button className={styles.button}>Sign in</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
