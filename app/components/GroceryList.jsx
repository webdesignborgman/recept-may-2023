/** @format */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../firebase/AuthContext';
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  where,
  getDocs,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import {
  IoTrashOutline,
  IoCreateOutline,
  IoCheckmarkOutline,
  IoCloseCircleOutline,
} from 'react-icons/io5';
import AddGroceryItem from '../components/AddGroceryItem';

export default function GroceryList() {
  const { currentUser } = useAuth();
  const [groceryItems, setGroceryItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemName, setEditItemName] = useState('');

  const handleEditItem = (itemId, itemName) => {
    setEditItemId(itemId);
    setEditItemName(itemName);
  };

  const handleSaveEdit = async (itemId) => {
    let groceryItemRef;

    if (
      currentUser.uid === 'OwsVYkKXwSOgBfgZbBMC7qQ3enB2' ||
      currentUser.uid === 'VuzhiNXWcsforAjn31fwwROSQ2B3'
    ) {
      groceryItemRef = doc(
        db,
        'groceryLists',
        'sharedList',
        'groceries',
        itemId
      );
    } else {
      groceryItemRef = doc(
        db,
        'groceryLists',
        currentUser.uid,
        'groceries',
        itemId
      );
    }

    const handleSaveEdit = async (itemId) => {
      let groceryItemRef;

      if (
        currentUser.uid === 'OwsVYkKXwSOgBfgZbBMC7qQ3enB2' ||
        currentUser.uid === 'VuzhiNXWcsforAjn31fwwROSQ2B3'
      ) {
        // If the logged-in user is either 'OwsVYkKXwSOgBfgZbBMC7qQ3enB2' or 'VuzhiNXWcsforAjn31fwwROSQ2B3',
        // use the 'sharedList' document instead of currentUser.uid
        groceryItemRef = doc(
          db,
          'groceryLists',
          'sharedList',
          'groceries',
          itemId
        );
      } else {
        groceryItemRef = doc(
          db,
          'groceryLists',
          currentUser.uid,
          'groceries',
          itemId
        );
      }

      // Update the item in the database with the new name
      await updateDoc(groceryItemRef, {
        name: editItemName,
      });

      // Clear the edit state
      setEditItemId(null);
      setEditItemName('');
    };

    const handleCancelEdit = () => {
      // Clear the edit state
      setEditItemId(null);
      setEditItemName('');
    };

    await updateDoc(groceryItemRef, {
      name: editItemName,
    });

    setEditItemId(null);
    setEditItemName('');
  };

  const handleCancelEdit = () => {
    setEditItemId(null);
    setEditItemName('');
  };

  const handleDeleteItem = async (itemId) => {
    try {
      let groceryItemRef;

      if (
        currentUser.uid === 'OwsVYkKXwSOgBfgZbBMC7qQ3enB2' ||
        currentUser.uid === 'VuzhiNXWcsforAjn31fwwROSQ2B3'
      ) {
        // If the logged-in user is either 'OwsVYkKXwSOgBfgZbBMC7qQ3enB2' or 'VuzhiNXWcsforAjn31fwwROSQ2B3',
        // use the 'sharedList' document instead of currentUser.uid
        groceryItemRef = doc(
          db,
          'groceryLists',
          'sharedList',
          'groceries',
          itemId
        );
      } else {
        groceryItemRef = doc(
          db,
          'groceryLists',
          currentUser.uid,
          'groceries',
          itemId
        );
      }

      // Delete the document from Firestore
      await deleteDoc(groceryItemRef);
    } catch (error) {
      console.log('Error deleting grocery item:', error);
      // Handle error if needed
    }
  };

  const handleDeleteUncheckedItems = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete all unchecked items?'
    );

    if (confirmDelete) {
      try {
        let uncheckedItemsQuery;

        if (
          currentUser.uid === 'OwsVYkKXwSOgBfgZbBMC7qQ3enB2' ||
          currentUser.uid === 'VuzhiNXWcsforAjn31fwwROSQ2B3'
        ) {
          // If the logged-in user is either 'OwsVYkKXwSOgBfgZbBMC7qQ3enB2' or 'VuzhiNXWcsforAjn31fwwROSQ2B3',
          // use the 'sharedList' document instead of currentUser.uid
          uncheckedItemsQuery = query(
            collection(db, 'groceryLists', 'sharedList', 'groceries'),
            where('isChecked', '==', false)
          );
        } else {
          uncheckedItemsQuery = query(
            collection(db, 'groceryLists', currentUser.uid, 'groceries'),
            where('isChecked', '==', false)
          );
        }

        const uncheckedItemsSnapshot = await getDocs(uncheckedItemsQuery);
        const batch = writeBatch(db);
        uncheckedItemsSnapshot.forEach((doc) => batch.delete(doc.ref));
        await batch.commit();
      } catch (error) {
        console.log('Error deleting unchecked items:', error);
        // Handle error if needed
      }
    }
  };

  const handleDeleteCheckedItems = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete all checked items?'
    );

    if (confirmDelete) {
      try {
        let checkedItemsQuery;

        if (
          currentUser.uid === 'OwsVYkKXwSOgBfgZbBMC7qQ3enB2' ||
          currentUser.uid === 'VuzhiNXWcsforAjn31fwwROSQ2B3'
        ) {
          // If the logged-in user is either 'OwsVYkKXwSOgBfgZbBMC7qQ3enB2' or 'VuzhiNXWcsforAjn31fwwROSQ2B3',
          // use the 'sharedList' document instead of currentUser.uid
          checkedItemsQuery = query(
            collection(db, 'groceryLists', 'sharedList', 'groceries'),
            where('isChecked', '==', true)
          );
        } else {
          checkedItemsQuery = query(
            collection(db, 'groceryLists', currentUser.uid, 'groceries'),
            where('isChecked', '==', true)
          );
        }

        const checkedItemsSnapshot = await getDocs(checkedItemsQuery);
        const batch = writeBatch(db);
        checkedItemsSnapshot.forEach((doc) => batch.delete(doc.ref));
        await batch.commit();
      } catch (error) {
        console.log('Error deleting checked items:', error);
        // Handle error if needed
      }
    }
  };

  const handleToggleItem = async (itemId, isChecked) => {
    let groceryItemRef;

    if (
      currentUser.uid === 'OwsVYkKXwSOgBfgZbBMC7qQ3enB2' ||
      currentUser.uid === 'VuzhiNXWcsforAjn31fwwROSQ2B3'
    ) {
      // If the logged-in user is either 'OwsVYkKXwSOgBfgZbBMC7qQ3enB2' or 'VuzhiNXWcsforAjn31fwwROSQ2B3',
      // use the 'sharedList' document instead of currentUser.uid
      groceryItemRef = doc(
        db,
        'groceryLists',
        'sharedList',
        'groceries',
        itemId
      );
    } else {
      groceryItemRef = doc(
        db,
        'groceryLists',
        currentUser.uid,
        'groceries',
        itemId
      );
    }

    await updateDoc(groceryItemRef, {
      isChecked: !isChecked,
    });
  };

  useEffect(() => {
    const filteredItems = groceryItems.filter((item) => item.isChecked);
    setCartItems(filteredItems);
  }, [groceryItems]);

  useEffect(() => {
    if (currentUser) {
      const collectionRef =
        currentUser.uid === 'OwsVYkKXwSOgBfgZbBMC7qQ3enB2' ||
        currentUser.uid === 'VuzhiNXWcsforAjn31fwwROSQ2B3'
          ? collection(db, 'groceryLists', 'sharedList', 'groceries')
          : collection(db, 'groceryLists', currentUser.uid, 'groceries');

      const unsubscribe = onSnapshot(query(collectionRef), (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGroceryItems(items);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center my-5">
        <h2>Please login to view your grocery list.</h2>
        <Link
          href="/"
          className="bg-gray-700 text-gray-100 rounded py-2 px-4 m-4"
        >
          Home
        </Link>
        <Link
          href="/user"
          className="bg-gray-700 text-gray-100 rounded py-2 px-4"
        >
          Login
        </Link>
      </div>
    );
  } else {
    return (
      <div className="bg-gray-700 p-4 rounded">
        <AddGroceryItem />
        <div className="flex items-center w-full my-4">
          <hr className="w-full border-gray-500" />
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-100 text-2xl mb-4">Boodschappen</h2>
          <span
            onClick={handleDeleteUncheckedItems}
            className="text-xs text-red-600 uppercase cursor-pointer"
          >
            delete all
          </span>
        </div>
        {groceryItems
          .filter((item) => !item.isChecked)
          .map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-2"
            >
              <div className="flex flex-row items-center flex-grow">
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  className="rounded-full h-6 w-6 border-gray-700 border-2 mr-4 mb-2"
                  onChange={() => handleToggleItem(item.id, item.isChecked)}
                />
                {editItemId === item.id ? (
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={editItemName}
                      onChange={(e) => setEditItemName(e.target.value)}
                      className="rounded border-gray-700 border-2 px-2 py-1 text-gray-800"
                    />
                    <button
                      onClick={() => handleSaveEdit(item.id)}
                      className="text-2xl text-green-500 cursor-pointer hover:text-green-100"
                    >
                      <IoCheckmarkOutline />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-2xl text-red-500 cursor-pointer hover:text-red-100"
                    >
                      <IoCloseCircleOutline />
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-100 text-xl self-start flex-grow">
                    {item.name}
                  </span>
                )}
              </div>
              {editItemId !== item.id && (
                <div className="flex items-center gap-4">
                  <div
                    onClick={() => handleEditItem(item.id, item.name)}
                    className="text-2xl text-blue-500 cursor-pointer hover:text-blue-100"
                  >
                    <IoCreateOutline />
                  </div>
                  <div
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-2xl text-yellow-500 cursor-pointer hover:text-yellow-100"
                  >
                    <IoTrashOutline />
                  </div>
                </div>
              )}
            </div>
          ))}

        <div className="flex items-center w-full my-4">
          <hr className="w-full border-gray-500" />
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-100 text-2xl mb-4">In de kar</h2>
          <span
            onClick={handleDeleteCheckedItems}
            className="text-xs text-red-600 uppercase cursor-pointer"
          >
            delete all
          </span>
        </div>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-2">
            <div className="flex flex-row items-center flex-grow">
              <input
                type="checkbox"
                className="rounded-full h-6 w-6 text-yellow-500 border-2 mr-4 mb-2"
                checked={item.isChecked}
                onChange={() => handleToggleItem(item.id, item.isChecked)}
              />
              {editItemId === item.id ? (
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    value={editItemName}
                    onChange={(e) => setEditItemName(e.target.value)}
                    className="rounded border-gray-700 border-2 px-2 py-1 text-gray-800"
                  />
                  <button
                    onClick={() => handleSaveEdit(item.id)}
                    className="text-2xl text-green-500 cursor-pointer hover:text-green-100"
                  >
                    <IoCheckmarkOutline />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="text-2xl text-red-500 cursor-pointer hover:text-red-100"
                  >
                    <IoCloseCircleOutline />
                  </button>
                </div>
              ) : (
                <span className="text-gray-100 text-xl self-start flex-grow">
                  {item.name}
                </span>
              )}
            </div>
            {editItemId !== item.id && (
              <div className="flex items-center gap-4">
                <div
                  onClick={() => handleEditItem(item.id, item.name)}
                  className="text-2xl text-blue-500 cursor-pointer hover:text-blue-100"
                >
                  <IoCreateOutline />
                </div>
                <div
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-2xl text-yellow-500 cursor-pointer hover:text-yellow-100"
                >
                  <IoTrashOutline />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}
