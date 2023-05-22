/** @format */
'use client';
// import { useRouter } from 'next/navigation';

// export default function RecipeDetailsPage({ params }) {
//   console.log(params);
//   const id = params.id;
//   // Fetch the recipe details using the `id` from the query params

//   return <div>Recipe ID: {id}</div>;
// }

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

// /** @format */

// import { useRouter } from 'next/navigation';
// import { db } from '../../firebase/firebase';
// import {
//   getFirestore,
//   doc,
//   getDoc,
//   getDocs,
//   collection,
// } from 'firebase/firestore';
// import RecipeDetailsCard from '../../components/RecipeDetailsCard';

// export default function RecipeDetailsPage({ params }) {
//   const router = useRouter();

//   if (router.isFallback) {
//     return <div>Loading...</div>;
//   }

//   return <RecipeDetailsCard recipe={recipe} />;
// }

// export async function getStaticPaths() {
//   const recipesRef = collection(getFirestore(), 'recipe');
//   const querySnapshot = await getDocs(recipesRef);

//   const paths = querySnapshot.docs.map((doc) => ({
//     params: { id: doc.id },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params }) {
//   const recipeRef = doc(db, 'recipe', params.id);
//   const recipeDoc = await getDoc(recipeRef);

//   if (!recipeDoc.exists()) {
//     return {
//       notFound: true,
//     };
//   }

//   const recipe = {
//     id: recipeDoc.id,
//     ...recipeDoc.data(),
//     createdAt: recipeDoc.data().createdAt.toDate().toISOString(),
//   };

//   return {
//     props: { recipe },
//     revalidate: 1,
//   };
// }
