/** @format */

const styles = {
  container: `bg-gray-700 p-4 border-t-2 border-gray-500`,
  title: `flex text-yellow-500 text-sm items-center justify-center`,
};

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>&copy; 2023 Webdesign Borgman</p>
      </div>
    </div>
  );
}

export default Footer;
