/** @format */

import React from 'react';

export default function loading() {
  return (
    <div className="flex items-center justify-center space-x-2 text-white-500">
      <div className="w-4 h-4 rounded-full animate-pulse dark:bg-yellow-400">
        xxx
      </div>
      <div className="w-4 h-4 rounded-full animate-pulse dark:bg-yellow-400">
        ---
      </div>
      <div className="w-4 h-4 rounded-full animate-pulse dark:bg-yellow-400">
        ooo
      </div>
    </div>
  );
}
