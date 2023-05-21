/** @format */

import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../firebase/AuthContext';
import { useState } from 'react';

export default function Register({ onBackToLogin }) {
  const { googleSignIn, register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    register(email, password, username);
  };

  return (
    <div className="w-full mx-auto max-w-md m-4 p-4 rounded-md shadow sm:p-8 dark:dark:bg-gray-700 dark:dark:text-gray-100">
      <h2 className="mb-3 text-3xl font-semibold text-center">
        Register a new account
      </h2>
      <h2 className="text-sm text-center dark:dark:text-gray-400">
        Already have account?
        <p
          rel="noopener noreferrer"
          className="focus:underline hover:underline cursor-pointer"
          onClick={onBackToLogin}
        >
          Back to login
        </p>
      </h2>

      <form
        noValidate=""
        action=""
        className="space-y-8 ng-untouched ng-pristine ng-valid"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm">
              Username
            </label>
            <input
              type="text"
              name="text"
              id="text"
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="current-username"
              placeholder="Leroy"
              className="w-full px-3 py-2 border rounded-md dark:dark:border-gray-700 dark:dark:bg-gray-900 dark:dark:text-gray-100 focus:dark:dark:border-violet-400"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="current-email"
              placeholder="leroy@jenkins.com"
              className="w-full px-3 py-2 border rounded-md dark:dark:border-gray-700 dark:dark:bg-gray-900 dark:dark:text-gray-100 focus:dark:dark:border-violet-400"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*****"
              autoComplete="current-password"
              className="w-full px-3 py-2 border rounded-md dark:dark:border-gray-700 dark:dark:bg-gray-900 dark:dark:text-gray-100 focus:dark:dark:border-violet-400"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleRegister}
          className="w-full px-8 py-3 font-semibold rounded-md dark:dark:bg-yellow-500 dark:dark:text-gray-900"
        >
          Register
        </button>
      </form>
      <div className="flex items-center w-full my-4">
        <hr className="w-full dark:dark:text-gray-400" />
        <p className="px-3 dark:dark:text-gray-400">OR</p>
        <hr className="w-full dark:dark:text-gray-400" />
      </div>
      <div className="my-6 space-y-4">
        <button
          aria-label="Login with Google"
          type="button"
          onClick={googleSignIn}
          className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:dark:border-gray-400 focus:ring-violet-400"
        >
          <FcGoogle className="w-5 h-5 fill-current" />
          <p>Login with Google</p>
        </button>
      </div>
    </div>
  );
}
