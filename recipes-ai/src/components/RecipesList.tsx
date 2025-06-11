type Props = {
    recipes: string[];
  };
  
  export default function RecipesList({ recipes }: Props) {
    if (recipes.length === 0) return null;
  
    return (
      <div className="mt-6 space-y-2">
        <h2 className="text-xl font-semibold">Sugestões de receitas:</h2>
        <ul className="list-disc list-inside">
          {recipes.map((recipe, index) => (
            <li key={index}>{recipe}</li>
          ))}
        </ul>
      </div>
    );
  }
  