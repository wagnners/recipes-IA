'use client';

import { useState } from 'react';
import IngredientsForm from '@/components/IngredientsForm';
import RecipesList from '@/components/RecipesList';

export default function HomePage() {
  const [recipes, setRecipes] = useState<string[]>([]);

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Receitas com IA</h1>
      <IngredientsForm onResult={setRecipes} />
      <RecipesList recipes={recipes} />
    </main>
  );
}
