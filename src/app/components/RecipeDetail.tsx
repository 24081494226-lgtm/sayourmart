import image_ff2d73d896d93b4b4942f36def86d2454d623c9e from 'figma:asset/ff2d73d896d93b4b4942f36def86d2454d623c9e.png';
import { ArrowLeft, Clock, Users, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { CartItem } from '../App';

interface RecipeDetailProps {
  recipeId: string;
  cartCount: number;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
  onNavigateToCart: () => void;
}

const recipesData: Record<string, any> = {
  '1': {
    name: 'Misoa Kuah Sederhana',
    image: image_ff2d73d896d93b4b4942f36def86d2454d623c9e,
    time: '15 menit',
    servings: 2,
    ingredients: [
      { id: 21, name: 'Misoa', amount: '200g', price: 25000, weight: '100 gram', calories: 180, image: 'https://images.unsplash.com/photo-1573485717587-0e4b5db419c8?w=400' },
      { id: 13, name: 'Bawang Putih', amount: '3 siung', price: 25000, weight: '25 gram', calories: 37, image: 'https://images.unsplash.com/photo-1730596628352-08a13f00f5cb?w=400' },
      { id: 16, name: 'Jahe Segar', amount: '2 cm', price: 20000, weight: '100 gram', calories: 80, image: 'https://images.unsplash.com/photo-1730596628352-08a13f00f5cb?w=400' },
      { id: 1, name: 'Bayam Segar', amount: '100g', price: 15000, weight: '250 gram', calories: 35, image: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?w=400' },
    ],
    steps: [
      'Rebus air hingga mendidih',
      'Tumis bawang putih dan jahe hingga harum',
      'Masukkan tumisan ke dalam air mendidih',
      'Tambahkan mie misoa, masak 2-3 menit',
      'Masukkan bayam, tunggu hingga layu',
      'Sajikan segera selagi hangat',
    ]
  },
  '2': {
    name: 'Garlic Butter Steak Bites',
    image: 'https://images.unsplash.com/photo-1732763897987-ce7e63a94d7c?w=600',
    time: '20 menit',
    servings: 2,
    ingredients: [
      { id: 5, name: 'Daging Sapi', amount: '300g', price: 120000, weight: '250 gram', calories: 625, image: 'https://images.unsplash.com/photo-1633862033814-180f66b0bf76?w=400' },
      { id: 13, name: 'Bawang Putih', amount: '5 siung', price: 25000, weight: '25 gram', calories: 37, image: 'https://images.unsplash.com/photo-1730596628352-08a13f00f5cb?w=400' },
      { id: 28, name: 'Olive Oil', amount: '3 sdm', price: 55000, weight: '100 ml', calories: 884, image: 'https://images.unsplash.com/photo-1680678242896-a8e64cb95b62?w=400' },
    ],
    steps: [
      'Potong daging sapi menjadi bite-sized pieces',
      'Panaskan olive oil dalam pan',
      'Masak daging hingga cokelat di semua sisi',
      'Tambahkan bawang putih cincang',
      'Masak hingga bawang putih harum',
      'Sajikan segera dengan taburan peterseli',
    ]
  },
  '3': {
    name: 'Mashed Potato with Cream Sauce',
    image: 'https://images.unsplash.com/photo-1637194502327-c99c94943680?w=600',
    time: '25 menit',
    servings: 3,
    ingredients: [
      { id: 3, name: 'Wortel Segar', amount: '500g', price: 18000, weight: '250 gram', calories: 103, image: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?w=400' },
      { id: 26, name: 'Saus Carbonara', amount: '200ml', price: 28000, weight: '1 jar', calories: 180, image: 'https://images.unsplash.com/photo-1680678242896-a8e64cb95b62?w=400' },
      { id: 27, name: 'Keju Parmesan', amount: '50g', price: 45000, weight: '100 gram', calories: 431, image: 'https://images.unsplash.com/photo-1680678242896-a8e64cb95b62?w=400' },
    ],
    steps: [
      'Rebus kentang hingga empuk',
      'Haluskan kentang dengan potato masher',
      'Panaskan cream sauce',
      'Campurkan sauce ke dalam mashed potato',
      'Taburkan keju parmesan',
      'Sajikan hangat',
    ]
  }
};

export function RecipeDetail({ recipeId, cartCount, onBack, onAddToCart, onNavigateToCart }: RecipeDetailProps) {
  const recipe = recipesData[recipeId] || recipesData['1'];

  return (
    <div className="min-h-screen bg-[#f0ead2] pb-20">
      {/* Header */}
      <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-white text-xl">Detail Resep</h1>
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

      <div className="px-6 py-6 space-y-6">
        {/* Recipe Info */}
        <div className="bg-white rounded-xl overflow-hidden shadow-md">
          <div className="h-48 overflow-hidden">
            <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-6">
            <h2 className="text-[#4a5742] text-xl mb-3">{recipe.name}</h2>
            <div className="flex gap-6 text-[#6b7463] text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{recipe.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{recipe.servings} porsi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-[#4a5742] mb-4">Bahan-Bahan</h3>
          <div className="space-y-3">
            {recipe.ingredients.map((ingredient: any) => (
              <div key={ingredient.id} className="flex items-center justify-between py-2 border-b border-[#dde5b6] last:border-0">
                <div>
                  <p className="text-[#4a5742]">{ingredient.name}</p>
                  <p className="text-[#6b7463] text-sm">{ingredient.amount}</p>
                </div>
                <p className="text-[#adc178]">
                  Rp {ingredient.price.toLocaleString('id-ID')}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#dde5b6]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#4a5742]">Total:</span>
              <span className="text-[#adc178]">
                Rp {recipe.ingredients.reduce((sum: number, item: any) => sum + item.price, 0).toLocaleString('id-ID')}
              </span>
            </div>
            <Button 
              onClick={() => {
                recipe.ingredients.forEach((ingredient: any) => {
                  onAddToCart({ 
                    id: ingredient.id, 
                    name: ingredient.name, 
                    price: ingredient.price, 
                    quantity: 1,
                    image: ingredient.image,
                    weight: ingredient.weight,
                    calories: ingredient.calories
                  });
                });
              }}
              className="w-full bg-[#adc178] hover:bg-[#9db066] text-white"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Tambah Semua ke Keranjang
            </Button>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-[#4a5742] mb-4">Langkah-Langkah</h3>
          <div className="space-y-3">
            {recipe.steps.map((step: string, index: number) => (
              <div key={index} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#adc178] text-white flex items-center justify-center flex-shrink-0 text-sm">
                  {index + 1}
                </div>
                <p className="text-[#4a5742] flex-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}