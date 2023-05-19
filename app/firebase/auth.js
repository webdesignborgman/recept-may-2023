/** @format */

import {
  createUserWithEmailAndPassword as createUser,
  signInWithEmailAndPassword as signIn,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from './firebase.js';

// Function to create a new user with email and password
export const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUser(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    // Handle error
  }
};

// Function to sign in with email and password
export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signIn(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.log(error.message);
  }
};

// Function to sign in with Google
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    return user;
  } catch (error) {
    // Handle error
  }
};

// Function to listen for changes in the authentication state
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

// Function to sign out:
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error.message);
  }
};
// export default async function signOutUser() {
//   const router = useRouter();
//   try {
//     await signOut(auth);
//     router.push('/');
//   } catch (error) {
//     console.log(error.message);
//   }
// }
