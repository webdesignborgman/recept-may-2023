/** @format */

import { useContext } from 'react';
import { AuthContext } from '../firebase/AuthContext';

export default function UserDashBoard() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <h1>User DashBoard:</h1>
      <p>Username: {currentUser.displayName}</p>
      <p>Email: {currentUser.email}</p>
    </div>
  );
}
