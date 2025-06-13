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

       .textura-suave {
          background-color: ;
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url('/assets/icons/hat-pattern.svg');
          background-repeat: repeat;
          background-size: 600px 600px;
          z-index: -1;
          pointer-events: none;
      }
      `}</style>
      <main className="min-w-full min-h-screen flex items-start md:items-center lg:items-center xl:items-center justify-center textura-suave py-4 ">
        <div className="max-w-xl lg:min-w-[60vw] w-full p-6 bg-[#b2d2ff] rounded-lg shadow-md shadow-black/20 mx-2 md:mx-0">
          <div className="min-w-full mb-6">
            <img src="/assets/icons/logo2.svg" className="w-[300px] m-auto" alt="" />
          </div>
          <IngredientsForm onResult={setRecipes} />
          <RecipesList recipes={recipes} />
        </div>
      </main>

    </>
  );
}
