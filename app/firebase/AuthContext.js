/** @format */

'use client';

import React, { useContext, useState, useEffect, useRef } from 'react';
import { auth, db } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function googleSignIn() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function signup(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    return;
  }

  async function register(email, password, username) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('Username created');
      await updateProfile(user, { displayName: username });
      console.log('displayname created');
      // Continue with any additional logic or redirection
    } catch (error) {
      console.log(error);
      // Handle registration error
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth)
      .then(() => {
        console.log('Logout successful');
      })
      .catch((error) => {
        console.log('Logout failed:', error.message);
      });
  }

  function resetPassword(email) {
    console.log('Reset password function called!');
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    register,
    logout,
    googleSignIn,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
