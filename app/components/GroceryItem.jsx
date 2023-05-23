/** @format */

'use client';

import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function GroceryItem({ item, userId }) {
  const [isChecked, setIsChecked] = useState(item.isChecked);

  const handleToggle = async () => {
    setIsChecked(!isChecked);

    // Update the Firestore document with the new checked state
    const itemDocRef = doc(db, 'groceryLists', 'sharedList', 'items', item.id);
    await updateDoc(itemDocRef, { isChecked: !isChecked });
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        disabled={!userId}
        className="mr-2"
      />
      <span>{item.name}</span>
    </div>
  );
}
