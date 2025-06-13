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
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url('/assets/icons/hat-pattern.svg');
          background-repeat: repeat;
          background-size: 600px 600px;
      }
      `}</style>
      <main className="min-w-full min-h-screen flex items-start md:items-center justify-center textura-suave py-12 md:py-4 ">
        <div className="max-w-xl lg:min-w-[50vw] my-8 xs:mt-[100px] md:mt-[100px] w-full p-6 bg-[#fdead1] rounded-2xl md:shadow-[0_15px_40px_rgba(0,0,0,0.10)] mx-2 md:mx-0 xl:scale-125">
          <div className="min-w-full mb-8">
            <img src="/assets/icons/logo.svg" className="w-[300px] m-auto" alt="" />
          </div>
          <IngredientsForm onResult={setRecipes} />
          <RecipesList recipes={recipes} />
        </div>
      </main>

    </>
  );
}
