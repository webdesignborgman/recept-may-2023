/** @format */

import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const RecipeForm = () => {
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [course, setCourse] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [cookingSteps, setCookingSteps] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to Firebase Storage
    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);

    // Get the URL of the uploaded image
    const imageUrl = await getDownloadURL(storageRef);

    // Add new recipe to Firestore
    const recipeCollection = collection(db, 'recipe');
    await addDoc(recipeCollection, {
      recipeTitle,
      recipeDescription,
      servingSize,
      course,
      ingredients,
      cookingSteps,
      imageUrl,
      createdAt: serverTimestamp(),
    });

    // Clear the form after submitting
    setRecipeTitle('');
    setRecipeDescription('');
    setServingSize('');
    setCourse('');
    setIngredients('');
    setCookingSteps('');
    setImage(null);
  };

  return (
    <div className="flex flex-col items-center bg-gray-700 max-w-sm mx-auto pt-4">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-yellow-500" htmlFor="recipeTitle">
            Recipe Title:
          </label>
        </div>
        <div>
          <input
            className="my-2 bg-gray-500 focus:bg-gray-700 p-2 rounded  focus:border-yellow-500 text-gray-900 focus:text-gray-200 border-2 focus:ring-0"
            type="text"
            id="recipeTitle"
            value={recipeTitle}
            onChange={(e) => setRecipeTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-yellow-500" htmlFor="image">
            Upload Image:
          </label>
        </div>
        <div>
          <input
            className="my-2 bg-blue-500"
            type="file"
            id="image"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
