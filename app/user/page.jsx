/** @format */

<<<<<<< HEAD
import { useContext } from 'react';
import { AuthContext } from '../firebase/AuthContext.js';
=======
>>>>>>> parent of 22f3e07 (fiddling wiht login)
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const userPage = () => {
  return (
    <div className="text-2xl">
      <LoginForm />
    </div>
  );
};

export default userPage;
