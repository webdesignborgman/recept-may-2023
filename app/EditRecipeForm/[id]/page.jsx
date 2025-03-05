// /app/editrecipe/[id]/page.jsx
'use client';

import { useParams } from 'next/navigation';
import EditRecipeForm from '@/app/components/EditRecipeForm';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/firebase';

const EditRecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        const docRef = doc(db, 'recipe', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRecipe({ id, ...docSnap.data() });
        } else {
          console.error('No such recipe!');
        }
      };
      fetchRecipe();
    }
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return <EditRecipeForm recipe={recipe} />;
};

export default EditRecipePage;
