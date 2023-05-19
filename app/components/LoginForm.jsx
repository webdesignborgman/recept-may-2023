/** @format */
'use client';

<<<<<<< HEAD
import { useContext } from 'react';
import { AuthContext } from '../firebase/AuthContext';
=======
>>>>>>> parent of 22f3e07 (fiddling wiht login)
import { MdRestaurantMenu } from 'react-icons/md';
import { useState } from 'react';
import { signInWithEmailAndPassword } from '../firebase/auth';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const styles = {
    container: 'w-full bg-gray-700 mx-auto p-4',
    title: 'text-gray-300 py-2 text-2xl flex justify-center mb-2',
    form: 'flex flex-col w-4/5 my-4 gap-3 mx-auto',
    input:
      'bg-gray-500 px-2 py-2 border border-gray-400 focus:outline-none focus:border-yellow-500 focus:border-2',
    button:
      'bg-gray-700 py-1 px-3 rounded text-yellow-500 text-base duration-300 hover:bg-yellow-500 hover:text-gray-700',
    toggle: 'text-end',
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call the sign in function from auth.js with the email and password

      const user = await signInWithEmailAndPassword(email, password);
      // Handle successful login
      router.push('/user/dashboard');
    } catch (error) {
      // Handle login error
      console.log('Login failed:', error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <MdRestaurantMenu size="2em" />
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button type="submit" className={styles.button}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
