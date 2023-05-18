/** @format */
import Link from 'next/link';
import { MdRestaurantMenu } from 'react-icons/md';

const styles = {
  container: `w-full bg-gray-700 p-4`,
  title: `flex text-yellow-500 text-1xl items-center justify-center gap-3 p-2`,
};

function Title() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Link href="/">
          <MdRestaurantMenu />
        </Link>

        <Link href="/">
          <h1>Borgman kitchen companion</h1>
        </Link>
      </div>
    </div>
  );
}

export default Title;
