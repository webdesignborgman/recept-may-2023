'use client';

import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const RecipeForm = () => {
  // Recipe form states
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [course, setCourse] = useState('');

  // Ingredients and Cooking Steps stored as arrays.
  const [ingredients, setIngredients] = useState(['']);
  const [cookingSteps, setCookingSteps] = useState(['']);

  // Image & Crop states
  const [upImg, setUpImg] = useState(null); // Data URL for preview
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ unit: 'px', width: 300, height: 300, x: 0, y: 0, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [croppedBlob, setCroppedBlob] = useState(null);

  // Handle file input change and load image as data URL
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setUpImg(reader.result);
        console.log('File loaded, data URL set.');
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Generate the cropped image blob from the completed crop
  const generateCroppedImage = async () => {
    console.log('generateCroppedImage called with completedCrop:', completedCrop);
    if (!completedCrop || !imgRef.current) {
      console.log('No completed crop or image ref available.');
      return;
    }
    if (!completedCrop.width || !completedCrop.height) {
      console.log('Crop dimensions are zero, please select a valid crop.');
      return;
    }
    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const fixedWidth = 300;
    const fixedHeight = 300;
    canvas.width = fixedWidth;
    canvas.height = fixedHeight;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      fixedWidth,
      fixedHeight
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          reject(new Error('Canvas is empty'));
          return;
        }
        console.log('Cropped blob generated:', blob);
        setCroppedBlob(blob);
        resolve(blob);
      }, 'image/jpeg');
    });
  };

  // Ingredient handlers
  const handleIngredientChange = (e, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = e.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index) => {
    // Prevent removing the first ingredient.
    if (index === 0) return;
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Cooking step handlers
  const handleCookingStepChange = (e, index) => {
    const newSteps = [...cookingSteps];
    newSteps[index] = e.target.value;
    setCookingSteps(newSteps);
  };

  const handleAddCookingStep = () => {
    setCookingSteps([...cookingSteps, '']);
  };

  const handleRemoveCookingStep = (index) => {
    if (index === 0) return;
    setCookingSteps(cookingSteps.filter((_, i) => i !== index));
  };

  // Handle form submission: upload cropped image and add recipe document
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!croppedBlob) {
      alert('Please crop your image before submitting.');
      return;
    }

    // Upload cropped image to Firebase Storage
    const storageRef = ref(storage, `images/${Date.now()}_cropped.jpg`);
    await uploadBytes(storageRef, croppedBlob);
    const imageUrl = await getDownloadURL(storageRef);

    // Add new recipe to Firestore, including ingredients and cooking steps arrays
    await addDoc(collection(db, 'recipe'), {
      recipeTitle,
      recipeDescription,
      servingSize,
      course,
      ingredients,
      cookingSteps,
      imageUrl,
      createdAt: serverTimestamp(),
    });

    // Clear form states
    setRecipeTitle('');
    setRecipeDescription('');
    setServingSize('');
    setCourse('');
    setIngredients(['']);
    setCookingSteps(['']);
    setUpImg(null);
    setCroppedBlob(null);
  };

  return (
    <div className="flex flex-col items-center bg-gray-700 max-w-md mx-auto pt-4">
      <form onSubmit={handleSubmit}>
        {/* Recipe Title */}
        <div>
          <label className="text-yellow-500" htmlFor="recipeTitle">Recipe Title:</label>
          <input
            className="my-2 w-full bg-gray-500 p-2 rounded text-yellow-100"
            type="text"
            id="recipeTitle"
            value={recipeTitle}
            onChange={(e) => setRecipeTitle(e.target.value)}
            required
          />
        </div>
        {/* Recipe Description */}
        <div>
          <label className="text-yellow-500" htmlFor="recipeDescription">Recipe Description:</label>
          <input
            className="my-2 w-full bg-gray-500 p-2 rounded text-yellow-100"
            type="text"
            id="recipeDescription"
            value={recipeDescription}
            onChange={(e) => setRecipeDescription(e.target.value)}
            required
          />
        </div>
        {/* Serving Size */}
        <div>
          <label className="text-yellow-500" htmlFor="servingSize">Recipe Serving Size:</label>
          <input
            className="my-2 w-14 bg-gray-500 p-2 rounded text-yellow-100"
            type="number"
            id="servingSize"
            value={servingSize}
            onChange={(e) => setServingSize(e.target.value)}
            required
          />
        </div>
        {/* Course Selection */}
        <div>
          <label className="text-yellow-500" htmlFor="course">Course:</label>
          <select
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="my-2 w-40 bg-gray-500 p-2 rounded text-yellow-100"
            required
          >
            <option value=""></option>
            <option value="Ontbijt">Ontbijt</option>
            <option value="Lunch">Lunch</option>
            <option value="Diner">Diner</option>
            <option value="Nagerecht">Nagerecht</option>
            <option value="Tussendoor">Tussendoor</option>
            <option value="Anders">Anders</option>
          </select>
        </div>

        {/* Dynamic Ingredients List */}
        <div>
          <label className="text-yellow-500">Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center my-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(e, index)}
                className="w-full bg-gray-500 p-2 rounded text-yellow-100"
                placeholder="Enter ingredient"
                required
              />
              <div className="ml-2 flex">
                {/* Plus icon on last ingredient */}
                {index === ingredients.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="px-2 py-1 bg-green-500 rounded text-white"
                  >
                    +
                  </button>
                )}
                {/* Minus icon on all but the first ingredient */}
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className="px-2 py-1 bg-red-500 rounded text-white ml-1"
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Cooking Steps List */}
        <div>
          <label className="text-yellow-500">Cooking Steps:</label>
          {cookingSteps.map((step, index) => (
            <div key={index} className="flex items-center my-2">
              <input
                type="text"
                value={step}
                onChange={(e) => handleCookingStepChange(e, index)}
                className="w-full bg-gray-500 p-2 rounded text-yellow-100"
                placeholder="Enter cooking step"
                required
              />
              <div className="ml-2 flex">
                {index === cookingSteps.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddCookingStep}
                    className="px-2 py-1 bg-green-500 rounded text-white"
                  >
                    +
                  </button>
                )}
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveCookingStep(index)}
                    className="px-2 py-1 bg-red-500 rounded text-white ml-1"
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Optional preview of the raw uploaded image */}
        {upImg && (
          <img src={upImg} alt="Preview" style={{ maxWidth: '300px', marginBottom: '1rem' }} />
        )}

        {/* Image Upload */}
        <div>
          <label className="text-yellow-500" htmlFor="image">Upload Image:</label>
          <input
            className="my-2 bg-blue-500"
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        {/* Image Cropper Preview */}
        {upImg && (
          <div>
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => {
                // Force crop to remain fixed at 300x300
                setCrop({ ...newCrop, unit: 'px', width: 300, height: 300, aspect: 1 });
                console.log('Crop changed:', newCrop);
              }}
              onComplete={(c) => {
                setCompletedCrop(c);
                console.log('Crop complete:', c);
              }}
            >
              <img
                src={upImg}
                alt="Crop me"
                style={{ maxWidth: '100%' }}
                onLoad={(e) => {
                  imgRef.current = e.currentTarget;
                  console.log('Image loaded via onLoad:', e.currentTarget);
                }}
              />
            </ReactCrop>
            <button
              type="button"
              onClick={generateCroppedImage}
              className="my-4 px-4 py-2 bg-green-500 rounded"
            >
              Crop Image
            </button>
          </div>
        )}

        {/* Preview Cropped Image */}
        {croppedBlob && (
          <div>
            <p className="text-yellow-500">Cropped Image Preview:</p>
            <img
              src={URL.createObjectURL(croppedBlob)}
              alt="Cropped preview"
              style={{ maxWidth: '200px', marginBottom: '1rem' }}
            />
          </div>
        )}

        <button
          className="w-2/4 my-4 px-2 py-2 rounded-md bg-yellow-500 text-gray-900"
          type="submit"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
