/** @format */

import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';

export default function Nav() {
  return (
    <div className="flex bg-gray-500 p-6 text-yellow-500 text-2xl items-center justify-between gap-3 mx-2 rounded">
      <div>
        <Link href="/search/">
          <button>
            <FaSearch />
          </button>
        </Link>
      </div>
      <div>
        <Link href="/user">
          <button className="bg-gray-700 py-1 px-3 rounded text-yellow-500 text-base mx-2 duration-300 hover:bg-yellow-500 hover:text-gray-700">
            Sign in
          </button>
        </Link>
      </div>
    </div>
  );
}
