/** @format */
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchRecipeDetails } from '../../firebase/store';
import RecipeDetailsCard from '../../components/RecipeDetailsCard';

export default function RecipeDetailsPage({ params }) {
  const id = params.id;

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (id) {
      fetchRecipe();
    }
  }, [id]);

  const fetchRecipe = async () => {
    const recipeData = await fetchRecipeDetails(id);
    setRecipe(recipeData);
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto">
      <RecipeDetailsCard recipe={recipe} id={id} />
    </div>
  );
}
