'use client';

import { useState } from 'react';
import IngredientsForm from '@/components/IngredientsForm';
import RecipesList from '@/components/RecipesList';
import { RecipeType } from '@/types/recipe';

export default function HomePage() {

  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  return (
    <>
      <style jsx>{`
        .textura-suave {
          position: relative;
          z-index: 0;
        }

        .textura-suave::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url('/assets/icons/hat.png');
          background-repeat: repeat;
          background-size: 80px 80px;
          opacity: 0.2;
          z-index: -1;
          pointer-events: none
        }
      `}</style>
      <main className="min-w-full min-h-screen flex items-center md:justify-center textura-suave py-4">
        <div className="max-w-xl w-full p-6 bg-[#b2d2ff] rounded-lg shadow-md shadow-black/20 mx-4 md:mx-0">
          <div className="min-w-full mb-6">
            <img src="/assets/icons/logo.svg" className="w-[200px] m-auto" alt="" />
          </div>
          <IngredientsForm onResult={setRecipes} />
          <RecipesList recipes={recipes} />
        </div>
      </main>

    </>
  );
}
