import image_a165bb4f4874b4988e080d0d7c891bae646092ac from 'figma:asset/a165bb4f4874b4988e080d0d7c891bae646092ac.png';
import image_06c7015f8dca06a233e709c4f14d89d53b5fd176 from 'figma:asset/06c7015f8dca06a233e709c4f14d89d53b5fd176.png';
import image_6dca1efe68f1eb2fe8434d8caa2ea1099ba536eb from 'figma:asset/6dca1efe68f1eb2fe8434d8caa2ea1099ba536eb.png';
import image_6cb4ec77b9d2538a08e32d60844fb02975536a05 from 'figma:asset/6cb4ec77b9d2538a08e32d60844fb02975536a05.png';
import image_de9462c14ccde8f47e99ef30094d77f8675eb3c0 from 'figma:asset/de9462c14ccde8f47e99ef30094d77f8675eb3c0.png';
import image_cc08ac1c2323996a5d8466b5db839e7014283379 from 'figma:asset/cc08ac1c2323996a5d8466b5db839e7014283379.png';
import image_c4e151039af26dbaa5dd8be90854899de186b17a from 'figma:asset/c4e151039af26dbaa5dd8be90854899de186b17a.png';
import image_ec3385c6cb101cc7e4d0b6e4d2bb67850250ef1e from 'figma:asset/ec3385c6cb101cc7e4d0b6e4d2bb67850250ef1e.png';
import image_56eafd6ed45a4ee444a9cab04044655616affa86 from 'figma:asset/56eafd6ed45a4ee444a9cab04044655616affa86.png';
import image_5134056c76798182e7f596c554aee799907d54b7 from 'figma:asset/5134056c76798182e7f596c554aee799907d54b7.png';
import image_eea60db063d80254cd19281065c6a14b550cc8e6 from 'figma:asset/eea60db063d80254cd19281065c6a14b550cc8e6.png';
import { ArrowLeft, Clock, ShoppingCart } from 'lucide-react';

interface MenuListProps {
  category: 'set-menu' | 'indonesian' | 'western';
  cartCount: number;
  onBack: () => void;
  onMenuSelect: (menuId: string) => void;
  onNavigateToCart: () => void;
}

const menuData = {
  'set-menu': {
    title: 'Set Menu',
    items: [
      { id: 'menu-1', name: 'Nasi goreng', time: '20 menit', difficulty: 'Mudah', image: image_6dca1efe68f1eb2fe8434d8caa2ea1099ba536eb, servings: 2 },
      { id: 'menu-2', name: 'Ayam bakar', time: '30 menit', difficulty: 'Sedang', image: image_ec3385c6cb101cc7e4d0b6e4d2bb67850250ef1e, servings: 2 },
      { id: 'menu-3', name: 'Rendang', time: '45 menit', difficulty: 'Sedang', image: image_06c7015f8dca06a233e709c4f14d89d53b5fd176, servings: 3 },
      { id: 'menu-4', name: 'Soto ayam', time: '35 menit', difficulty: 'Mudah', image: image_a165bb4f4874b4988e080d0d7c891bae646092ac, servings: 2 },
    ],
  },
  'indonesian': {
    title: 'Indonesian Menu',
    items: [
      { id: 'indo-1', name: 'Ayam goreng ketumbar', time: '25 menit', difficulty: 'Mudah', image: image_eea60db063d80254cd19281065c6a14b550cc8e6, servings: 2 },
      { id: 'indo-2', name: 'Pecel', time: '15 menit', difficulty: 'Mudah', image: image_5134056c76798182e7f596c554aee799907d54b7, servings: 1 },
      { id: 'indo-3', name: 'Sayur lodeh', time: '20 menit', difficulty: 'Mudah', image: image_56eafd6ed45a4ee444a9cab04044655616affa86, servings: 2 },
      { id: 'indo-4', name: 'Ayam bakar', time: '30 menit', difficulty: 'Sedang', image: image_ec3385c6cb101cc7e4d0b6e4d2bb67850250ef1e, servings: 2 },
    ],
  },
  'western': {
    title: 'Western Menu',
    items: [
      { id: 'west-1', name: 'Fish and chips', time: '25 menit', difficulty: 'Sedang', image: image_6cb4ec77b9d2538a08e32d60844fb02975536a05, servings: 2 },
      { id: 'west-2', name: 'Salad', time: '10 menit', difficulty: 'Mudah', image: image_de9462c14ccde8f47e99ef30094d77f8675eb3c0, servings: 1 },
      { id: 'west-3', name: 'Spaghetti', time: '20 menit', difficulty: 'Mudah', image: image_cc08ac1c2323996a5d8466b5db839e7014283379, servings: 2 },
      { id: 'west-4', name: 'Steak', time: '30 menit', difficulty: 'Sedang', image: image_c4e151039af26dbaa5dd8be90854899de186b17a, servings: 2 },
    ],
  },
};

export function MenuList({ category, cartCount, onBack, onMenuSelect, onNavigateToCart }: MenuListProps) {
  const menuCategory = menuData[category];

  return (
    <div className="min-h-screen bg-[#f0ead2] pb-20">
      <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-white text-xl">{menuCategory.title}</h1>
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
        {menuCategory.items.map((menu) => (
          <button
            key={menu.id}
            onClick={() => onMenuSelect(menu.id)}
            className="w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex gap-4"
          >
            <div className="w-32 h-32 overflow-hidden flex-shrink-0">
              <img src={menu.image} alt={menu.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-left py-4 pr-4">
              <h3 className="text-[#4a5742] mb-2">{menu.name}</h3>
              <div className="flex items-center gap-4 text-[#6b7463] text-sm mb-2">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{menu.time}</span>
                </div>
                <span>• {menu.difficulty}</span>
              </div>
              <span className="inline-block bg-[#dde5b6] text-[#4a5742] px-3 py-1 rounded-full text-xs">
                {menu.servings} porsi
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
