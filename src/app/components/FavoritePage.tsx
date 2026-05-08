import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { CartItem } from '../App';

interface FavoritePageProps {
  cartCount: number;
  onAddToCart: (item: CartItem) => void;
  onNavigateToCart: () => void;
  favoriteItems: CartItem[];
  toggleFavorite: (item: CartItem) => void;
}

export function FavoritePage({ cartCount, onAddToCart, onNavigateToCart, favoriteItems, toggleFavorite }: FavoritePageProps) {
  return (
    <div className="min-h-screen bg-[#f0ead2] pb-20">
      {/* Header */}
      <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-xl">Favorit Saya</h1>
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

      <div className="px-6 py-6">
        {favoriteItems.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-md text-center">
            <Heart className="w-16 h-16 text-[#dde5b6] mx-auto mb-4" />
            <p className="text-[#6b7463]">Belum ada favorit</p>
            <p className="text-[#6b7463] text-sm mt-2">
              Mulai tambahkan item ke favorit Anda!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {favoriteItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="relative">
                  <div className="h-40 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => toggleFavorite(item)}
                    className="absolute top-2 right-2 bg-white/90 p-2 rounded-full"
                  >
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-[#4a5742] mb-2">{item.name}</p>
                  <p className="text-[#adc178] mb-3">
                    Rp {item.price.toLocaleString('id-ID')}
                  </p>
                  <Button 
                    onClick={() => onAddToCart({ 
                      id: item.id, 
                      name: item.name, 
                      price: item.price, 
                      quantity: 1,
                      image: item.image,
                      weight: item.weight,
                      calories: item.calories
                    })}
                    className="w-full bg-[#adc178] hover:bg-[#9db066] text-white h-9"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Tambah
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
