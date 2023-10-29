/** @format */

'use client';

import { useRouter } from 'next/navigation';

export default function recipeControlPanel() {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto">
      <div className="text-yellow-500 font-bold text-3xl text-center my-4 max-w-md w-full mx-auto">
        Recipe Control Panel
      </div>
      <div className="flex justify-around gap-6">
        <button
          onClick={() => router.push('/recipecp/addrecipe')}
          className="w-2/4 mt-4 px-8 py-3 font-Large rounded-md dark:dark:bg-yellow-500 dark:dark:text-gray-900"
        >
          Add recipe
        </button>
        <button
          onClick={() => router.push('/recipecp')}
          className="w-2/4 mt-4 px-8 py-3 font-Large rounded-md dark:dark:bg-yellow-500 dark:dark:text-gray-900"
        >
          Edit / Delete recipe
        </button>
      </div>
      {/* <AddRecipeForm /> */}
    </div>
  );
}
