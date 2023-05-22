/** @format */

import Image from 'next/image';

const styles = {
  container: `max-w-md w-full mx-auto bg-gray-700 p-4  mx-auto flex flex-col relative`,
  picframe: `w-72 h-72 border-2 border-yellow-500 mx-auto my-8`,
  divtitle: `bg-gray-500/80 flex flex-col justify-center items-center w-full absolute inset-x-0 bottom-20 h-16`,
  title: `text-yellow-500 font-bold text-3xl`,
};

function RecipeMainCard(recipe) {
  // console.log(recipe);
  return (
    <div className={styles.container}>
      <div className={styles.picframe}>
        <Image
          src={recipe.recipe.imageUrl}
          width={300}
          height={300}
          alt="Photo of dish"
          // placeholder="blur"
        />
      </div>
      <div className={styles.divtitle}>
        <h3 className={styles.title}>{recipe.recipe.recipeTitle}</h3>
        <h3 className="bg-yellow-500 px-2">{recipe.recipe.course}</h3>
      </div>
    </div>
  );
}

export default RecipeMainCard;
