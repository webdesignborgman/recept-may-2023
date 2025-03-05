/** @format */

'use client';

import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function googleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      // Add select_account to force account selection
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      // First try popup
      try {
        const result = await signInWithPopup(auth, provider);
        return result;
      } catch (popupError) {
        console.log('Popup blocked or failed, falling back to redirect', popupError);
        
        // If popup fails, fall back to redirect
        await signInWithRedirect(auth, provider);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.message);
      throw error;
    }
  }

  // Handle redirect result
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // Handle successful redirect sign-in
          console.log('Redirect sign-in successful');
        }
      } catch (error) {
        console.error('Redirect sign-in error:', error);
        setError(error.message);
      }
    };

    handleRedirectResult();
  }, []);

  function signup(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    return;
  }

  async function register(email, password, username) {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Username created');
      await updateProfile(user, { displayName: username });
      console.log('displayname created');
    } catch (error) {
      console.log(error);
      setError(error.message);
      throw error;
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    try {
      signOut(auth);
      console.log('Logout successful');
    } catch (error) {
      console.log('Logout failed:', error.message);
      setError(error.message);
    }
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
    error,
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
