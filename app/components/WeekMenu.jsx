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
    <div className="flex flex-col">
      <div className="flex justify-center items-center">
        <div className="text-xl font-bold mb-3">WeekMenu</div>
      </div>

      <div className="flex flex-row font-bold mb-3">
        <div className="w-3/12 text-left">Dag</div>
        <div className="w-2/12 text-left">Dienst</div>
        <div className="w-7/12 text-left">Maaltijd</div>
      </div>

      {weekMenus.map((weekMenu) => (
        <div>
          <hr className="w-full border-1 border-gray-600" />
          <div key={weekMenu.id} className="flex flex-row">
            {/* <div className="w-3/12">{weekMenu.dag}</div> */}
            <div className="w-3/12">
              <input
                type="text"
                value={weekMenu.dag}
                disabled
                onChange={(event) => handleDienstChange(event, weekMenu.id)}
                className="bg-gray-700 border-none pl-0"
              />
            </div>
            <div className="w-2/12">
              <input
                type="text"
                value={weekMenu.dienst}
                onChange={(event) => handleDienstChange(event, weekMenu.id)}
                className="bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-yellow-500 w-15 pl-0"
              />
            </div>
            <div className="w-7/12">
              <textarea
                value={weekMenu.maaltijd}
                onChange={(event) => handleMaaltijdChange(event, weekMenu.id)}
                rows={2}
                className="bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-yellow-500 pl-0"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeekMenu;
