'use client';

import { useState } from 'react';
import IngredientsInput from './IngredientsInput';
import { RecipeType } from '@/types/recipe';

type Props = {
  onResult: (recipes: RecipeType[]) => void;
};

export default function IngredientsForm({ onResult }: Props) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Se seu backend espera string separada por vírgula, transforme o array:
    const ingredientsStr = ingredients.join(', ');

    const res = await fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: ingredientsStr }),
    });

    const data = await res.json();
    onResult(data.recipes || []);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <IngredientsInput
        onChange={(newTags) => setIngredients(newTags)}
        initialTags={ingredients}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Buscando receitas...' : 'Buscar receitas'}
      </button>
    </form>
  );
}
