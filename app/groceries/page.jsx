/** @format */

'use client';

import AddGroceryItem from '../components/AddGroceryItem';
import GroceryList from '../components/GroceryList';

export default function groeceriesPage() {
  return (
    <div className="max-w-md mx-auto text-gray-300">
      <GroceryList />
    </div>
  );
}
