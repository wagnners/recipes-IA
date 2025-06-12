import { RecipeType } from "@/types/recipe";
import RecipeImage from "./RecipeImage";

type Props = {
  recipes: RecipeType[];
};

export default function RecipesList({ recipes }: Props) {
  if (recipes.length === 0) return null;

  return (
    <div className="mt-6 space-y-6">
      <div className="flex items-center gap-2 mb-4 border-b-1 border-[#d2b97f] pb-1 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-[#bd0101]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <h2 className="text-md font-semibold text-[#bd0101]">Sugestões de receitas:</h2>
      </div>
      {recipes.map((r) => (
        <div
          key={r.title}
          className="bg-white rounded-xl shadow-md shadow-black/10 border border-[#d2b97f] overflow-hidden transition-transform duration-300 transform hover:scale-110 hover:shadow-lg"
        >
          <RecipeImage title={r.keywords} />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-[#bd0101] mb-2">{r.title}</h3>
            <p className="text-sm whitespace-pre-line text-neutral-700">{r.recipe}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
