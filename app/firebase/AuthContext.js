/** @format */

'use client';

import React, { useContext, useState, useEffect, useRef } from 'react';
import { auth, db } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
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

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  //   function logout() {
  //     console.log('Logout succesfull!');
  //     return signOut(auth);
  //   }
  function logout() {
    console.log('Logout function is called');
    return signOut(auth)
      .then(() => {
        console.log('Logout successful');
      })
      .catch((error) => {
        console.log('Logout failed:', error.message);
      });
  }
  //   const auth = getAuth();
  //   signOut(auth).then(() => {
  //     // Sign-out successful.
  //   }).catch((error) => {
  //     // An error happened.
  //   });

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
    logout,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
