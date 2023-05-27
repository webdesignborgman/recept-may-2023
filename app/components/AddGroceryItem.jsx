/** @format */

'use client';

import { useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function AddGroceryItem() {
  const { currentUser } = useAuth();
  const [itemName, setItemName] = useState('');

  const handleAddItem = async () => {
    if (itemName.trim() === '') {
      return;
    }

    try {
      const groceryItem = {
        name: itemName.trim(),
        isChecked: false,
      };

      let groceryListCollection;
      if (
        currentUser.uid === 'OwsVYkKXwSOgBfgZbBMC7qQ3enB2' ||
        currentUser.uid === 'VuzhiNXWcsforAjn31fwwROSQ2B3'
      ) {
        groceryListCollection = collection(
          db,
          'groceryLists',
          'sharedList',
          'groceries'
        );
      } else {
        groceryListCollection = collection(
          db,
          'groceryLists',
          currentUser.uid,
          'groceries'
        );
      }

      await addDoc(groceryListCollection, groceryItem);
      setItemName('');
    } catch (error) {
      console.error('Error adding grocery item:', error);
    }
  };

  // const handleAddItem = async () => {
  //   if (itemName.trim() === '') {
  //     return;
  //   }

  //   try {
  //     const groceryItem = {
  //       name: itemName.trim(),
  //       isChecked: false,
  //     };

  //     await addDoc(
  //       collection(db, 'groceryLists', currentUser.uid, 'groceries'),
  //       groceryItem
  //     );
  //     setItemName('');
  //   } catch (error) {
  //     console.error('Error adding grocery item:', error);
  //   }
  // };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <div className="mb-4 w-full flex justify-between">
      <input
        type="text"
        placeholder="Enter item name"
        value={itemName}
        onKeyDown={handleKeyDown}
        onChange={(e) => setItemName(e.target.value)}
        className="p-1 rounded border flex-1 text-gray-700 placeholder:italic placeholder:text-gray-400"
      />
      <button
        onClick={handleAddItem}
        className="bg-gray-700 text-gray-100 rounded py-2 px-4 ml-2"
      >
        Add Item
      </button>
    </div>
  );
}
