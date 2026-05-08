import { Home, Heart, ShoppingBag, FileText, User } from 'lucide-react';

interface FloatingMenuProps {
  activeTab: 'home' | 'favorite' | 'products' | 'orders' | 'account';
  onTabChange: (tab: 'home' | 'favorite' | 'products' | 'orders' | 'account') => void;
}

export function FloatingMenu({ activeTab, onTabChange }: FloatingMenuProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#dde5b6] shadow-lg">
      <div className="flex justify-around items-center px-4 py-3">
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center gap-1 transition-transform ${
            activeTab === 'home' ? 'text-[#adc178] -translate-y-1 scale-110' : 'text-[#6b7463]'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </button>
        
        <button
          onClick={() => onTabChange('favorite')}
          className={`flex flex-col items-center gap-1 transition-transform ${
            activeTab === 'favorite' ? 'text-[#adc178] -translate-y-1 scale-110' : 'text-[#6b7463]'
          }`}
        >
          <Heart className={`w-6 h-6 ${activeTab === 'favorite' ? 'fill-[#adc178]' : ''}`} />
          <span className="text-xs">Favorite</span>
        </button>
        
        <button
          onClick={() => onTabChange('products')}
          className={`flex flex-col items-center gap-1 transition-transform ${
            activeTab === 'products' ? 'text-[#adc178] -translate-y-1 scale-110' : 'text-[#6b7463]'
          }`}
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="text-xs">Products</span>
        </button>
        
        <button
          onClick={() => onTabChange('orders')}
          className={`flex flex-col items-center gap-1 transition-transform ${
            activeTab === 'orders' ? 'text-[#adc178] -translate-y-1 scale-110' : 'text-[#6b7463]'
          }`}
        >
          <FileText className="w-6 h-6" />
          <span className="text-xs">Orders</span>
        </button>
        
        <button
          onClick={() => onTabChange('account')}
          className={`flex flex-col items-center gap-1 transition-transform ${
            activeTab === 'account' ? 'text-[#adc178] -translate-y-1 scale-110' : 'text-[#6b7463]'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Account</span>
        </button>
      </div>
    </div>
  );
}
