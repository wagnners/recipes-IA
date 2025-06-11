import { RecipeType } from "@/types/recipe";
import RecipeImage from "./RecipeImage";

type Props = {
  recipes: RecipeType[];
};

export default function RecipesList({ recipes }: Props) {
  if (recipes.length === 0) return null;

  return (
    <div className="mt-6 space-y-2">
      <h2 className="text-xl font-semibold">Sugestões de receitas:</h2>
      <ul className="list-disc list-inside">
        {recipes.map((r) => (
          <div key={r.title} className="border p-4 rounded mb-4">
            <RecipeImage title={r.title_en || r.title} />
            <h2 className="text-xl font-semibold">{r.title}</h2>
            <p className="mt-2 whitespace-pre-line">{r.recipe}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}
