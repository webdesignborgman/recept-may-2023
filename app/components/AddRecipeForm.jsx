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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="recipeTitle">Recipe Title:</label>
        <input
          type="text"
          id="recipeTitle"
          value={recipeTitle}
          onChange={(e) => setRecipeTitle(e.target.value)}
          required
        />
      </div>

      {/* Similar divs for recipeDescription, servingSize, course, ingredients, and cookingSteps... */}

      <div>
        <label htmlFor="image">Upload Image:</label>
        <input type="file" id="image" onChange={handleImageChange} required />
      </div>

      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;
