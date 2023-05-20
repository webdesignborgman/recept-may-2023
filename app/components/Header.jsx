/** @format */

import Link from 'next/link';
import { MdRestaurantMenu } from 'react-icons/md';

export default function Header() {
  return (
    <div className="flex bg-gray-700 p-4 text-yellow-500 text-1xl items-center justify-center gap-3 m-2 rounded">
      <Link href="/">
        <MdRestaurantMenu />
      </Link>

      <Link href="/">
        <h1>Borgman&#39;s kitchen companion</h1>
      </Link>
    </div>
  );
}
