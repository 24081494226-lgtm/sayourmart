import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { CartItem } from '../App';

interface BestDealsProps {
  cartCount: number;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
  onNavigateToCart: () => void;
  toggleFavorite?: (item: CartItem) => void;
  isFavorite?: (id: number) => boolean;
}

const deals = [
  { id: 9, name: 'Apel Fuji', price: 10000, originalPrice: 15000, discount: '33%', weight: '1 pcs', calories: 52, image: 'https://images.unsplash.com/photo-1602693874812-408fc283f9ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdWppJTIwYXBwbGV8ZW58MXx8fHwxNzY0MDgxNTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 11, name: 'Pisang Cavendish', price: 4000, originalPrice: 6000, discount: '33%', weight: '1 pcs', calories: 100, image: 'https://images.unsplash.com/photo-1740760673599-3efd26d64631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjBjYXZlbmRpc2h8ZW58MXx8fHwxNzY0MDg1OTU2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 4, name: 'Tomat Cherry', price: 20000, originalPrice: 28000, discount: '29%', weight: '250 gr', calories: 45, image: 'https://images.unsplash.com/photo-1570543375343-63fe3d67761b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVycnklMjB0b21hdG98ZW58MXx8fHwxNzY0MDgxNTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 3, name: 'Wortel', price: 8000, originalPrice: 12000, discount: '33%', weight: '1 pcs', calories: 30, image: 'https://images.unsplash.com/photo-1737402710058-0ce100f79b34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJyb3QlMjB2ZWdldGFibGV8ZW58MXx8fHwxNzYzOTk0NTQwfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 1, name: 'Bayam segar', price: 15000, originalPrice: 20000, discount: '25%', weight: '250 gr', calories: 58, image: 'https://images.unsplash.com/photo-1683536905403-ea18a3176d29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNwaW5hY2h8ZW58MXx8fHwxNzY0MDYxNzk0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 15, name: 'Cabe merah', price: 10000, originalPrice: 15000, discount: '33%', weight: '100 gr', calories: 318, image: 'https://images.unsplash.com/photo-1707857204225-b526447975ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBjaGlsaSUyMHBlcHBlcnxlbnwxfHx8fDE3NjQwODU5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
];

export function BestDeals({ cartCount, onBack, onAddToCart, onNavigateToCart, toggleFavorite, isFavorite }: BestDealsProps) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavoriteLocal = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#f0ead2] pb-20">
      {/* Header */}
      <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-white text-xl">Penawaran Terbaik</h1>
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

      <div className="px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          {deals.map((deal) => (
            <div key={deal.id} className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="relative">
                <div className="h-40 overflow-hidden">
                  <img src={deal.image} alt={deal.name} className="w-full h-full object-cover" />
                </div>
                <button
                  onClick={() => toggleFavorite ? toggleFavorite(deal) : toggleFavoriteLocal(deal.id)}
                  className="absolute top-2 right-2 bg-white/90 p-2 rounded-full"
                >
                  <Heart 
                    className={`w-4 h-4 ${isFavorite ? isFavorite(deal.id) : favorites.includes(deal.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                  />
                </button>
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs">
                  {deal.discount} OFF
                </div>
              </div>
              <div className="p-3">
                <p className="text-[#4a5742] mb-1">{deal.name}</p>
                <p className="text-[#6b7463] text-xs mb-2">{deal.weight} • {deal.calories} kcal</p>
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-[#adc178]">
                    Rp {deal.price.toLocaleString('id-ID')}
                  </p>
                  <p className="text-[#6b7463] text-xs line-through">
                    Rp {deal.originalPrice.toLocaleString('id-ID')}
                  </p>
                </div>
                <Button 
                  onClick={() => onAddToCart({ 
                    id: deal.id, 
                    name: deal.name, 
                    price: deal.price, 
                    quantity: 1,
                    image: deal.image,
                    weight: deal.weight,
                    calories: deal.calories
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
      </div>
    </div>
  );
}