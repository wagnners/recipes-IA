'use client';

import { useState } from 'react';

type Props = {
  onResult: (recipes: string[]) => void;
};

export default function IngredientsForm({ onResult }: Props) {
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients }),
    });

    const data = await res.json();
    onResult(data.recipes || []);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Digite os ingredientes separados por vírgula"
        className="w-full p-2 border rounded"
        rows={4}
        required
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
