/** @format */

import { getFirestore, doc, getDoc } from 'firebase/firestore';

// This is a helper function to fetch a single recipe's details.

export async function fetchRecipeDetails(recipeId) {
  const firestore = getFirestore();
  const recipeRef = doc(firestore, 'recipe', recipeId);
  const recipeDoc = await getDoc(recipeRef);

  if (recipeDoc.exists()) {
    return {
      id: recipeDoc.id,
      ...recipeDoc.data(),
    };
  } else {
    return null;
  }
}
