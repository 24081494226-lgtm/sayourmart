import image_ff2d73d896d93b4b4942f36def86d2454d623c9e from 'figma:asset/ff2d73d896d93b4b4942f36def86d2454d623c9e.png';
import { ArrowLeft, Clock, ShoppingCart } from 'lucide-react';

interface RecipeListProps {
  cartCount: number;
  onBack: () => void;
  onRecipeSelect: (id: string) => void;
  onNavigateToCart: () => void;
}

const recipes = [
  { 
    id: '1', 
    name: 'Misoa Kuah Sederhana', 
    time: '15 menit', 
    difficulty: 'Mudah', 
    category: 'Indonesian',
    image: image_ff2d73d896d93b4b4942f36def86d2454d623c9e
  },
  { 
    id: '2', 
    name: 'Garlic Butter Steak Bites', 
    time: '20 menit', 
    difficulty: 'Sedang', 
    category: 'Western',
    image: 'https://images.unsplash.com/photo-1732763897987-ce7e63a94d7c?w=400'
  },
  { 
    id: '3', 
    name: 'Mashed Potato with Cream Sauce', 
    time: '25 menit', 
    difficulty: 'Mudah', 
    category: 'Western',
    image: 'https://images.unsplash.com/photo-1637194502327-c99c94943680?w=400'
  },
];

export function RecipeList({ cartCount, onBack, onRecipeSelect, onNavigateToCart }: RecipeListProps) {
  return (
    <div className="min-h-screen bg-[#f0ead2] pb-20">
      {/* Header */}
      <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-white text-xl">Ide Resep</h1>
          </div>
          <button 
            onClick={onNavigateToCart}
            className="bg-white/20 p-2 rounded-full relative"
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {recipes.map((recipe) => (
          <button
            key={recipe.id}
            onClick={() => onRecipeSelect(recipe.id)}
            className="w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex gap-4"
          >
            <div className="w-32 h-32 overflow-hidden flex-shrink-0">
              <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-left py-4 pr-4">
              <h3 className="text-[#4a5742] mb-2">{recipe.name}</h3>
              <div className="flex items-center gap-4 text-[#6b7463] text-sm mb-2">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.time}</span>
                </div>
                <span>• {recipe.difficulty}</span>
              </div>
              <span className="inline-block bg-[#dde5b6] text-[#4a5742] px-3 py-1 rounded-full text-xs">
                {recipe.category}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}