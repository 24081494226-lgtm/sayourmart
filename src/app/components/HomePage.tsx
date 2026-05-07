import image_958fc9b5e3a016faefc087bfc782c748cdffab40 from 'figma:asset/958fc9b5e3a016faefc087bfc782c748cdffab40.png';
import image_ff2d73d896d93b4b4942f36def86d2454d623c9e from 'figma:asset/ff2d73d896d93b4b4942f36def86d2454d623c9e.png';
import image_4560d596d36e8455e711628a1829fb8e62c4d121 from 'figma:asset/4560d596d36e8455e711628a1829fb8e62c4d121.png';
import image_aa3e39080b8801ac0f316681020c6da79a9433c6 from 'figma:asset/aa3e39080b8801ac0f316681020c6da79a9433c6.png';
import image_acac2e17236730e86dc0f9e6383cca6de3d9434d from 'figma:asset/acac2e17236730e86dc0f9e6383cca6de3d9434d.png';
import bannerImage from 'figma:asset/4c286f88bd7b7d8bc9aa3b590020860d1ef60462.png';
import { MapPin, ShoppingCart, Gift, Calendar, Heart } from 'lucide-react';
import { User } from '../App';
import logoImage from 'figma:asset/dc876fe12f1da0fb4a781be2497566321560d1a7.png';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface HomePageProps {
  user: User | null;
  cartCount: number;
  onNavigateToBestDeals: () => void;
  onNavigateToRecipes: () => void;
  onNavigateToCart: () => void;
  onNavigateToCategory: (category: string) => void;
  onNavigateToRecipeDetail: (recipeId: string) => void;
  onCheckIn: () => void;
  memberPoints: number;
  toggleFavorite?: (item: any) => void;
  isFavorite?: (id: number) => boolean;
  checkedInDays?: number;
}

const categories = [
  { id: 'sayur', name: 'Sayur', emoji: '🥬' },
  { id: 'protein', name: 'Protein', emoji: '🥩' },
  { id: 'buah', name: 'Buah', emoji: '🍎' },
  { id: 'bumbu', name: 'Bumbu', emoji: '🌶️' },
  { id: 'camilan', name: 'Camilan', emoji: '🍟' },
  { id: 'set-menu', name: 'Set Menu', emoji: '🍱' },
  { id: 'indonesian', name: 'Indonesian', emoji: '🍜' },
  { id: 'western', name: 'Western', emoji: '🍝' },
];

const recipes = [
  {
    id: 1,
    name: 'Misoa Kuah Sederhana',
    time: '15 menit',
    difficulty: 'Mudah',
    image: image_ff2d73d896d93b4b4942f36def86d2454d623c9e
  },
  {
    id: 2,
    name: 'Garlic Butter Steak Bites',
    time: '20 menit',
    difficulty: 'Sedang',
    image: 'https://images.unsplash.com/photo-1732763897987-ce7e63a94d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVhayUyMGJ1dHRlciUyMGdhcmxpY3xlbnwxfHx8fDE3NjM0NjI2MzN8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    name: 'Mashed Potato with Cream Sauce',
    time: '25 menit',
    difficulty: 'Mudah',
    image: 'https://images.unsplash.com/photo-1637194502327-c99c94943680?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNoZWQlMjBwb3RhdG8lMjBjcmVhbXxlbnwxfHx8fDE3NjM0NjI2MzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
];

export function HomePage({ user, cartCount, onNavigateToBestDeals, onNavigateToRecipes, onNavigateToCart, onNavigateToCategory, onNavigateToRecipeDetail, onCheckIn, memberPoints, toggleFavorite, isFavorite, checkedInDays }: HomePageProps) {
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showVoucherClaimed, setShowVoucherClaimed] = useState(false);
  const [voucherClaimed, setVoucherClaimed] = useState(false);

  const handleClaimVoucher = () => {
    setVoucherClaimed(true);
    setShowVoucherClaimed(true);
    setTimeout(() => {
      setShowVoucherClaimed(false);
    }, 2000);
  };

  const handleCategoryClick = (categoryId: string) => {
    // For set-menu, indonesian, western -> navigate to menu list page
    if (categoryId === 'set-menu' || categoryId === 'indonesian' || categoryId === 'western') {
      onNavigateToCategory(categoryId);
    } else {
      // For other categories -> navigate to products page
      onNavigateToCategory(categoryId);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0ead2] pb-20">
      {/* Header */}
      <div className="bg-[#626F47] px-6 py-4 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img 
              src={image_958fc9b5e3a016faefc087bfc782c748cdffab40} 
              alt="Sayour Mart" 
              className="w-12 h-12 object-contain bg-white rounded-full p-1"
            />
            <div>
              <p className="text-white text-base">Halo,</p>
              <p className="text-white text-xl">{user?.name || 'User'}</p>
            </div>
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
        
        <div className="flex items-center gap-2 text-white">
          <MapPin className="w-5 h-5" />
          <span className="text-base">{user?.location || 'Surabaya'}</span>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Voucher & Check-in Section */}
        <div className="grid grid-cols-2 gap-3">
          {/* Voucher */}
          <div className="bg-[#F0BB78] rounded-xl p-4 shadow-md relative">
            <Gift className="w-8 h-8 text-black mb-2" />
            <h3 className="text-black text-sm mb-1">Voucher Spesial</h3>
            <p className="text-black/80 text-xs mb-3">Diskon 20%</p>
            <button 
              onClick={handleClaimVoucher}
              disabled={voucherClaimed}
              className={`px-4 py-1.5 rounded-lg text-xs ${
                voucherClaimed 
                  ? 'bg-white/50 text-gray-500 cursor-not-allowed' 
                  : 'bg-white text-black font-medium'
              }`}
            >
              {voucherClaimed ? 'Sudah Diklaim' : 'Klaim'}
            </button>
          </div>

          {/* Daily Check-in */}
          <button 
            onClick={() => setShowCheckIn(true)}
            className="bg-[#A4B465] rounded-xl p-4 shadow-md text-left"
          >
            <Calendar className="w-8 h-8 text-black mb-2" />
            <h3 className="text-black text-sm mb-1">Check-in Harian</h3>
            <p className="text-black/80 text-xs mb-3">Dapat 10 poin</p>
            <div className="bg-white text-black px-4 py-1.5 rounded-lg text-xs inline-block font-medium">
              Check-in Sekarang
            </div>
          </button>
        </div>

        {/* Banner */}
        <div className="rounded-xl overflow-hidden shadow-md">
          <img src={bannerImage} alt="Sayour Mart Banner" className="w-full h-auto object-cover" />
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-[#4a5742] mb-3">Kategori</h2>
          <div className="grid grid-cols-4 gap-3">
            {categories.slice(0, 4).map((category) => (
              <button 
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="flex flex-col items-center gap-2 bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl">{category.emoji}</div>
                <span className="text-xs text-[#4a5742] text-center">{category.name}</span>
              </button>
            ))}
          </div>
          {categories.length > 4 && (
            <div className="grid grid-cols-4 gap-3 mt-3">
              {categories.slice(4).map((category) => (
                <button 
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex flex-col items-center gap-2 bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl">{category.emoji}</div>
                  <span className="text-xs text-[#4a5742] text-center">{category.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Best Deals */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[#4a5742]">Penawaran Terbaik</h2>
            <button 
              onClick={onNavigateToBestDeals}
              className="text-[#adc178] text-sm"
            >
              Lihat Semua
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 9, name: 'Apel Fuji', price: 25000, image: image_aa3e39080b8801ac0f316681020c6da79a9433c6, weight: '1 pcs', calories: 52 },
              { id: 1, name: 'Bayam Segar', price: 15000, image: image_4560d596d36e8455e711628a1829fb8e62c4d121, weight: '250 gr', calories: 58 }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm relative">
                <div className="h-32 overflow-hidden relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  {toggleFavorite && isFavorite && (
                    <button
                      onClick={() => toggleFavorite({ 
                        id: item.id, 
                        name: item.name, 
                        price: item.price, 
                        quantity: 1, 
                        image: item.image, 
                        weight: item.weight, 
                        calories: item.calories 
                      })}
                      className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full"
                    >
                      <Heart 
                        className={`w-4 h-4 ${isFavorite(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                      />
                    </button>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-[#4a5742] text-sm mb-1">{item.name}</p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-[#adc178]">Rp {item.price.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recipe Ideas */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[#4a5742]">Ide Resep</h2>
            <button 
              onClick={onNavigateToRecipes}
              className="text-[#adc178] text-sm"
            >
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3">
            {recipes.slice(0, 2).map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-xl overflow-hidden shadow-sm flex gap-3">
                <div className="w-24 h-24 overflow-hidden flex-shrink-0">
                  <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 py-3 pr-3">
                  <h3 className="text-[#4a5742] mb-1 text-sm">{recipe.name}</h3>
                  <p className="text-[#6b7463] text-xs mb-2">{recipe.time} • {recipe.difficulty}</p>
                  <button className="text-[#adc178] text-xs" onClick={() => onNavigateToRecipeDetail(recipe.id.toString())}>Lihat Resep →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Check-in Dialog */}
      <Dialog open={showCheckIn} onOpenChange={setShowCheckIn}>
        <DialogContent className="bg-[#f0ead2] border-[#dde5b6]">
          <DialogHeader>
            <DialogTitle className="text-[#4a5742]">Check-in Harian</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="grid grid-cols-7 gap-2 mb-6">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div
                  key={day}
                  className="flex flex-col items-center gap-1"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    day <= (checkedInDays || 0) ? 'bg-[#adc178] text-white' : 'bg-white text-gray-400 border-2 border-[#dde5b6]'
                  }`}>
                    {day}
                  </div>
                  <span className="text-xs text-[#6b7463]">Hari {day}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => {
                setShowCheckIn(false);
                onCheckIn();
              }}
              className="w-full bg-[#adc178] text-white py-3 rounded-lg hover:bg-[#9db066]"
            >
              Check-in Hari Ini
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Voucher Claimed Dialog */}
      <Dialog open={showVoucherClaimed} onOpenChange={setShowVoucherClaimed}>
        <DialogContent className="bg-[#f0ead2] border-[#dde5b6]">
          <DialogHeader>
            <DialogTitle className="text-[#4a5742] text-center">Voucher Berhasil Diklaim!</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center">
            <Gift className="w-16 h-16 mx-auto text-[#adc178] mb-4" />
            <p className="text-[#4a5742]">Voucher siap digunakan</p>
            <p className="text-[#6b7463] text-sm mt-2">Diskon 20% telah ditambahkan ke akun Anda</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}