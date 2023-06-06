/** @format */

// comment

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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IoReorderThreeOutline } from 'react-icons/io5';

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

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // Check if a valid destination is provided
    if (destination) {
      // Check if the draggable item is moved to a different position
      if (
        source.index !== destination.index ||
        source.droppableId !== destination.droppableId
      ) {
        const sourceWeekMenuId = source.droppableId; // ID of the source WeekMenu
        const destinationWeekMenuId = destination.droppableId; // ID of the destination WeekMenu

        // Find the respective WeekMenu objects in the state
        const sourceWeekMenu = weekMenus.find(
          (weekMenu) => weekMenu.id === sourceWeekMenuId
        );
        const destinationWeekMenu = weekMenus.find(
          (weekMenu) => weekMenu.id === destinationWeekMenuId
        );

        // Update the respective Maaltijd values in Firestore
        updateDoc(doc(db, 'weekMenus', sourceWeekMenuId), {
          maaltijd: destinationWeekMenu.maaltijd,
        });
        updateDoc(doc(db, 'weekMenus', destinationWeekMenuId), {
          maaltijd: sourceWeekMenu.maaltijd,
        });
      }
    }
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 py-4 text-xl font-bold text-center border-yellow-500 border-b-2">
          WeekMenu
        </div>

        <div className="col-span-3">Dag</div>
        <div className="col-span-2 col-start-4">Dienst</div>
        <div className="col-span-7">Maaltijd</div>
        <div className="col-span-12 border-yellow-50 border-b-2"></div>

        <div className="col-span-12">
          {weekMenus.map((weekMenu, index) => (
            <div
              key={weekMenu.id}
              className="grid grid-cols-12 border-gray-600 border-b-2"
            >
              <div className="col-span-3 pt-1.5">{weekMenu.dag}</div>

              <div className="col-span-2 col-start-4">
                <input
                  type="text"
                  value={weekMenu.dienst}
                  onChange={(event) => handleDienstChange(event, weekMenu.id)}
                  className="w-14 bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-yellow-500 pl-0.5"
                />
              </div>

              <Droppable droppableId={weekMenu.id}>
                {(provided = {}) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="col-span-7 relative"
                  >
                    <Draggable draggableId={weekMenu.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div className="drag-content">
                            <textarea
                              value={weekMenu.maaltijd}
                              onChange={(event) =>
                                handleMaaltijdChange(event, weekMenu.id)
                              }
                              rows={2}
                              className="w-full bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-yellow-500 pl-0.5"
                            />
                          </div>
                          <div
                            {...provided.dragHandleProps}
                            className="text-right absolute bottom-0 right-2 text-2xl text-yellow-500"
                          >
                            <IoReorderThreeOutline />
                          </div>
                        </div>
                      )}
                    </Draggable>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default WeekMenu;
