/** @format */

'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

const WeekMenu = () => {
  const [weekMenus, setWeekMenus] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'weekMenus'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedWeekMenus = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWeekMenus(updatedWeekMenus);
    });

    return unsubscribe;
  }, []);

  const handleDagChange = (event, id) => {
    console.log(event.target.value);
  };

  const handleDienstChange = async (event, id) => {
    const { value } = event.target;
    const weekMenuRef = doc(db, 'weekMenus', id);
    await updateDoc(weekMenuRef, { dienst: value });
  };

  const handleMaaltijdChange = async (event, id) => {
    const { value } = event.target;
    const weekMenuRef = doc(db, 'weekMenus', id);
    await updateDoc(weekMenuRef, { maaltijd: value });
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">WeekMenu</div>

      <div className="col-span-3">Dag</div>
      <div className="col-span-2 col-start-4">Dienst</div>
      <div className="col-span-7">Maaltijd</div>

      {weekMenus.map((weekMenu) => (
        <div key={weekMenu.id} className="col-span-12 grid grid-cols-12">
          <div className="col-span-3 pt-1.5">{weekMenu.dag}</div>

          <div className="col-span-2 col-start-4">
            <input
              type="text"
              // maxLength={3}
              value={weekMenu.dienst}
              onChange={(event) => handleDienstChange(event, weekMenu.id)}
              className="w-14 bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-yellow-500 pl-0"
            />
          </div>
          <div className="col-span-7">
            <textarea
              value={weekMenu.maaltijd}
              onChange={(event) => handleMaaltijdChange(event, weekMenu.id)}
              rows={2}
              className="w-full bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-yellow-500 pl-0"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeekMenu;
