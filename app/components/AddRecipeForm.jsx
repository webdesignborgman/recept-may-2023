'use client';

import React, { useState, useRef, useCallback } from 'react';
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
  const [ingredients, setIngredients] = useState('');
  const [cookingSteps, setCookingSteps] = useState('');

  // Image & Crop states
  const [upImg, setUpImg] = useState(null); // Data URL for preview
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 50, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [croppedBlob, setCroppedBlob] = useState(null);

  // Handle file input change and load image as data URL
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // When the image is loaded, keep a reference for cropping
  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  // Generate the cropped image blob from the completed crop
  const generateCroppedImage = async () => {
    if (!completedCrop || !imgRef.current) {
      return;
    }
    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          reject(new Error('Canvas is empty'));
          return;
        }
        setCroppedBlob(blob);
        resolve(blob);
      }, 'image/jpeg');
    });
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

    // Clear form states
    setRecipeTitle('');
    setRecipeDescription('');
    setServingSize('');
    setCourse('');
    setIngredients('');
    setCookingSteps('');
    setUpImg(null);
    setCroppedBlob(null);
  };

  return (
    <div className="flex flex-col items-center bg-gray-700 max-w-md mx-auto pt-4">
      <form onSubmit={handleSubmit}>
        {/* Recipe Title */}
        <div>
          <label className="text-yellow-500" htmlFor="recipeTitle">
            Recipe Title:
          </label>
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
          <label className="text-yellow-500" htmlFor="recipeDescription">
            Recipe Description:
          </label>
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
          <label className="text-yellow-500" htmlFor="servingSize">
            Recipe Serving Size:
          </label>
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
          <label className="text-yellow-500" htmlFor="course">
            Course:
          </label>
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
        {/* Additional input fields for ingredients, cooking steps, etc. can be added similarly */}
        {upImg && <img src={upImg} alt="Preview" style={{ maxWidth: '300px', marginBottom: '1rem' }} />}

        {/* Image Upload */}
        <div>
          <label className="text-yellow-500" htmlFor="image">
            Upload Image:
          </label>
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
              src={upImg}
              onImageLoaded={(img) => {
                imgRef.current = img;
                console.log('Image loaded:', img);
              }}
              crop={crop}
              onChange={(newCrop) => {
                setCrop(newCrop);
                console.log('Crop changed:', newCrop);
              }}
              onComplete={(c) => {
                setCompletedCrop(c);
                console.log('Crop complete:', c);
              }}
              ruleOfThirds
            />
            <button
              type="button"
              onClick={generateCroppedImage}
              className="my-4 px-4 py-2 bg-green-500 rounded"
            >
              Crop Image
            </button>
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
