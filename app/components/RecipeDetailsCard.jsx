/** @format */
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaFacebookF, FaWhatsapp, FaTwitter } from 'react-icons/fa';

const styles = {
  ul: `list-disc ml-8`,
  ol: `list-decimal ml-8`,
  li: `text-gray-50 p-1`,
  picframe: `w-72 h-72 border-2 border-yellow-500 mx-auto mt-5 mb-6`,
  container: `bg-gray-700 p-4  mx-auto flex flex-col relative`,
  divtitle: `bg-gray-500/80 flex flex-col justify-center items-center w-full absolute inset-x-0 bottom-20 h-16`,
  title: `text-yellow-500 font-bold text-3xl text-center`,
  button: `bg-gray-500 px-2 text-center mt-4 p-2 duration-300 hover:bg-yellow-500 hover:text-gray-700`,
  shareButton: `inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 hover:bg-yellow-500 text-gray-700 hover:text-gray-50 transition duration-300 ease-in-out mx-1`,
};

function RecipeDetailsCard({ recipe }) {
  const [activeTab, setActiveTab] = useState('ingredients');
  console.log(recipe);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, '_blank');
  };

  const handleShareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, '_blank');
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, '_blank');
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{recipe.recipeTitle}</h3>
      <h3 className="bg-yellow-500 px-2 text-center mt-2">{recipe.course}</h3>
      {/* Share buttons */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button className={styles.shareButton} onClick={handleShareFacebook}>
          <FaFacebookF />
        </button>

        <button className={styles.shareButton} onClick={handleShareWhatsApp}>
          <FaWhatsapp />
        </button>

        <button className={styles.shareButton} onClick={handleShareTwitter}>
          <FaTwitter />
        </button>
      </div>
      <div className={styles.picframe}>
        {console.log(recipe.imageUrl)}
        <Image
          src={recipe.imageUrl}
          width={300}
          height={300}
          alt="Photo of dish"
          // placeholder="blur"
        />
      </div>

      <div className="flex justify-center items-center mb-4">
        <button
          className={`px-4 py-2 mr-4 font-bold text-gray-800 ${
            activeTab === 'ingredients'
              ? 'bg-yellow-500 text-gray-700'
              : 'bg-gray-500'
          }`}
          onClick={() => handleTabClick('ingredients')}
        >
          Ingredients
        </button>
        <button
          className={`px-4 py-2 font-bold text-gray-800 ${
            activeTab === 'cookingSteps'
              ? 'bg-yellow-500 text-gray-700'
              : 'bg-gray-500'
          }`}
          onClick={() => handleTabClick('cookingSteps')}
        >
          Cooking Steps
        </button>
      </div>
      <div>
        {activeTab === 'ingredients' && (
          <div className="p-4 bg-gray-500 border border-yellow-500 shadow">
            <h2 className="mb-2 font-bold text-gray-50">Ingredients:</h2>
            <ul className={styles.ul}>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className={styles.li}>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'cookingSteps' && (
          <div className="p-4 bg-gray-500 border border-yellow-500 shadow">
            <h2 className="mb-2 font-bold text-gray-50">Cooking Steps:</h2>
            <ol className={styles.ol}>
              {recipe.cookingSteps.map((cookingStep, index) => (
                <li key={index} className={styles.li}>
                  {cookingStep}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      <button onClick={handleGoBack} className={styles.button}>
        Back
      </button>
    </div>
  );
}

export default RecipeDetailsCard;
