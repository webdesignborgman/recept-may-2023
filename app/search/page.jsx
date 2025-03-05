'use client';

import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/firebase/firebase'; // adjust path as needed
import Fuse from 'fuse.js';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SearchRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const resultsPerPage = 5;
  const router = useRouter();

  // Available course types
  const courseTypes = ['all', 'Ontbijt', 'Lunch', 'Diner', 'Nagerecht', 'Tussendoor', 'Anders'];

  // Fetch all recipes on mount
  useEffect(() => {
    async function fetchRecipes() {
      try {
        const querySnapshot = await getDocs(collection(db, 'recipe'));
        const recipeList = [];
        querySnapshot.forEach((doc) => {
          recipeList.push({ id: doc.id, ...doc.data() });
        });
        setRecipes(recipeList);
        setResults(recipeList);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
    fetchRecipes();
  }, []);

  // Filter recipes using Fuse.js when query or filter changes
  useEffect(() => {
    let filteredRecipes = recipes;
    
    // First apply course filter if not 'all'
    if (selectedCourse !== 'all') {
      filteredRecipes = recipes.filter(recipe => recipe.course === selectedCourse);
    }

    // Then apply search if there's a query
    if (query.trim() === '') {
      setResults(filteredRecipes);
    } else {
      const fuse = new Fuse(filteredRecipes, {
        keys: ['recipeTitle'],
        threshold: 0.4,
      });
      const fuseResults = fuse.search(query);
      setResults(fuseResults.map((result) => result.item));
    }
    setCurrentPage(1); // Reset to first page on filter change
  }, [query, recipes, selectedCourse]);

  // Pagination calculations
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  // Navigate to recipe details page
  const handleClickResult = (id) => {
    // Assuming your details page is routed as /recipes/[id]
    router.push(`/recipes/${id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Search Recipes</h1>
      
      <div className="flex flex-col gap-4 mb-4 mx-auto max-w-[448px]">
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded bg-gray-700 text-white"
        />
        
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded bg-gray-700 text-white"
        >
          {courseTypes.map((course) => (
            <option key={course} value={course}>
              {course === 'all' ? 'All Courses' : course}
            </option>
          ))}
        </select>
      </div>

      <div className="text-gray-300 mb-4">
        {results.length} {results.length === 1 ? 'recipe' : 'recipes'} found
      </div>

      {currentResults.length === 0 && <p>No results found.</p>}
      <ul>
        {currentResults.map((recipe) => (
          <li
            key={recipe.id}
            onClick={() => handleClickResult(recipe.id)}
            className="flex items-center p-2 cursor-pointer hover:bg-gray-600 rounded mb-2"
          >
            <Image
              src={recipe.imageUrl}
              alt={recipe.recipeTitle}
              width={50}
              height={50}
              className="rounded"
            />
            <div className="ml-4">
              <p className="font-bold text-white">{recipe.recipeTitle}</p>
              <p className="text-gray-300">{recipe.course}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex flex-col items-center mt-4">
        <div className="flex justify-center gap-4 mb-2">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Prev
            </button>
          )}
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Next
            </button>
          )}
        </div>
        <p className="text-gray-300">
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
}
