/** @format */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import RecipeMainCard from './RecipeMainCard';
import { useAuth } from '../firebase/AuthContext';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  limit,
  startAfter,
} from 'firebase/firestore';

const styles = {
  title: `text-yellow-500 font-bold text-3xl text-center mt-2 max-w-md w-full mx-auto`,
  button: `bg-gray-500 text-yellow-500 px-4 text-center mt-4 p-2 duration-300 hover:bg-yellow-500 hover:text-gray-900`,
};

export default function IndexListing() {
  const { currentUser } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [lastRecipe, setLastRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      const q = query(
        collection(getFirestore(), 'recipe'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const querySnapshot = await getDocs(q);
      const recipeDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(recipeDocs);
      const lastRecipeDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastRecipe(lastRecipeDoc);
    };

    fetchRecipes();
  }, []);

  const handleShowMore = async () => {
    const q = query(
      collection(getFirestore(), 'recipe'),
      orderBy('createdAt', 'desc'),
      startAfter(lastRecipe),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    const recipeDocs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRecipes((prevRecipes) => [...prevRecipes, ...recipeDocs]);
    const lastRecipeDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    setLastRecipe(lastRecipeDoc);
  };

  return (
    <div>
      <h2 className={styles.title}>Latest Recipes</h2>
      {recipes.map((recipe) => (
        <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
          <RecipeMainCard key={recipe.id} recipe={recipe} />
        </Link>
      ))}
      {lastRecipe && (
        <button onClick={handleShowMore} className={styles.button}>
          Show More...
        </button>
      )}
    </div>
  );
}
