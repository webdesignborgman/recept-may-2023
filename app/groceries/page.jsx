/** @format */

'use client';

import AddGroceryItem from '../components/AddGroceryItem';
import GroceryList from '../components/GroceryList';
import { useAuth } from '../firebase/AuthContext';

export default function groeceriesPage() {
  const { currentUser } = useAuth();
  return (
    <div className="max-w-md mx-auto text-gray-300">
      {currentUser && <AddGroceryItem />}

      <GroceryList />
    </div>
  );
}
