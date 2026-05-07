import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { LocationScreen } from './components/LocationScreen';
import { HomePage } from './components/HomePage';
import { FloatingMenu } from './components/FloatingMenu';
import { BestDeals } from './components/BestDeals';
import { RecipeList } from './components/RecipeList';
import { RecipeDetail } from './components/RecipeDetail';
import { ShoppingCart } from './components/ShoppingCart';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderTracking } from './components/OrderTracking';
import { FavoritePage } from './components/FavoritePage';
import { ProductCategory } from './components/ProductCategory';
import { MyOrders } from './components/MyOrders';
import { AccountPage } from './components/AccountPage';
import { SettingsPage } from './components/SettingsPage';
import { HelpSupportPage } from './components/HelpSupportPage';
import { ChatAdmin } from './components/ChatAdmin';
import { MenuList } from './components/MenuList';
import { MenuDetail } from './components/MenuDetail';
import { FeedbackPage } from './components/FeedbackPage';
import { ChatDriver } from './components/ChatDriver';

export type Screen =
| 'splash'
| 'login'
| 'register'
| 'location'
| 'home'
| 'best-deals'
| 'recipe-list'
| 'recipe-detail'
| 'cart'
| 'checkout'
| 'order-tracking'
| 'favorite'
| 'products'
| 'my-orders'
| 'account'
| 'settings'
| 'help-support'
| 'chat-admin'
| 'chat-driver'
| 'menu-list'
| 'menu-detail'
| 'feedback';

export interface User {
name: string;
email: string;
phone: string;
location: string;
profilePhoto?: string;
fullAddress?: {
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  street: string;
  detail: string;
};
}

export interface CartItem {
id: number;
name: string;
price: number;
quantity: number;
image: string;
weight: string;
calories: number;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  items: CartItem[];
  total: number;
  statusColor: string;
  timestamp?: string;
  currentStep?: number;
  feedbackGiven?: boolean;
  orderTime?: string;
  statusHistory?: { status: string; time: string }[];
  orderDate?: Date;
}

export default function App() {
const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
const [user, setUser] = useState<User | null>(null);
const [selectedRecipeId, setSelectedRecipeId] = useState<string>('');
const [selectedMenuId, setSelectedMenuId] = useState<string>('');
const [selectedMenuCategory, setSelectedMenuCategory] = useState<'set-menu' | 'indonesian' | 'western'>('set-menu');
const [selectedProductCategory, setSelectedProductCategory] = useState<string>('all');
const [activeMenuTab, setActiveMenuTab] = useState<'home' | 'favorite' | 'products' | 'orders' | 'account'>('home');
const [cartItems, setCartItems] = useState<CartItem[]>([]);
const [favoriteItems, setFavoriteItems] = useState<CartItem[]>([]);
const [memberPoints, setMemberPoints] = useState(() => {
  const saved = localStorage.getItem('memberPoints');
  return saved ? parseInt(saved) : 0;
});
const [orderStatus, setOrderStatus] = useState('Dalam Pengiriman');
const [lastOrderItems, setLastOrderItems] = useState<CartItem[]>([]);
const [orders, setOrders] = useState<Order[]>([]);
const [currentOrderId, setCurrentOrderId] = useState<string>('');
const [checkedInDays, setCheckedInDays] = useState<number>(() => {
  const saved = localStorage.getItem('checkedInDays');
  return saved ? parseInt(saved) : 0;
});
const [lastCheckInDate, setLastCheckInDate] = useState<string>(() => {
  return localStorage.getItem('lastCheckInDate') || '';
});
const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

// Save memberPoints to localStorage whenever it changes
useEffect(() => {
  localStorage.setItem('memberPoints', memberPoints.toString());
}, [memberPoints]);

useEffect(() => {
const timer = setTimeout(() => {
setCurrentScreen('login');
}, 3000);
return () => clearTimeout(timer);
}, []);

const handleLogin = (name: string, email: string, password: string) => {
setUser({
name,
email,
phone: '081234567890',
location: 'Surabaya',
});
setCurrentScreen('location');
};

const handleRegister = (name: string, email: string, phone: string, password: string) => {
setUser({
name,
email,
phone,
location: 'Surabaya',
});
setCurrentScreen('location');
};

const handleLocationConfirm = (location: string, fullAddress: any) => {
if (user) {
setUser({ ...user, location, fullAddress });
}
setCurrentScreen('home');
};

const handleMenuChange = (tab: 'home' | 'favorite' | 'products' | 'orders' | 'account') => {
setActiveMenuTab(tab);
switch (tab) {
case 'home':
setCurrentScreen('home');
break;
case 'favorite':
setCurrentScreen('favorite');
break;
case 'products':
// Reset kategori ke 'all' saat mengakses products dari menu bawah
setSelectedProductCategory('all');
setCurrentScreen('products');
break;
case 'orders':
setCurrentScreen('my-orders');
break;
case 'account':
setCurrentScreen('account');
break;
}
};

const addToCart = (item: CartItem) => {
setCartItems(prev => {
const existingItem = prev.find(i => i.id === item.id);
if (existingItem) {
return prev.map(i =>
i.id === item.id
? { ...i, quantity: i.quantity + 1 }
: i
);
}
return [...prev, { ...item, quantity: 1 }];
});
};

const updateCartQuantity = (id: number, delta: number) => {
setCartItems(items =>
items.map(item =>
item.id === id
? { ...item, quantity: Math.max(0, item.quantity + delta) }
: item
).filter(item => item.quantity > 0)
);
};

const removeFromCart = (id: number) => {
setCartItems(items => items.filter(item => item.id !== id));
};

const handleCheckIn = () => {
  const today = new Date().toISOString().split('T')[0];
  if (lastCheckInDate !== today) {
    const newDays = checkedInDays + 1;
    setMemberPoints(prev => prev + 10);
    setCheckedInDays(newDays);
    setLastCheckInDate(today);
    localStorage.setItem('checkedInDays', newDays.toString());
    localStorage.setItem('lastCheckInDate', today);
  }
};

const handleUpdateUser = (userData: User) => {
setUser(userData);
};

const toggleFavorite = (item: CartItem) => {
setFavoriteItems(prev => {
  const exists = prev.find(i => i.id === item.id);
  if (exists) {
    return prev.filter(i => i.id !== item.id);
  }
  return [...prev, item];
});
};

const isFavorite = (id: number) => {
return favoriteItems.some(item => item.id === id);
};

const handleUpdateProfilePhoto = (photoUrl: string) => {
if (user) {
  setUser({ ...user, profilePhoto: photoUrl });
}
};

const handleCheckout = (coinsUsed: number) => {
// Hitung total
const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

// Generate order ID dengan timestamp
const orderNumber = orders.length + 1;
const now = new Date();
const orderId = `#ORD${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(orderNumber).padStart(3, '0')}`;

// Format tanggal (DD MMM YYYY)
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const orderDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

// Format waktu untuk status history
const formatTime = (date: Date) => {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} WIB`;
};

// Buat status history dengan waktu real
const statusHistory = [
  { status: 'Pesanan Dikonfirmasi', time: formatTime(now) }
];

// Buat order baru
const newOrder: Order = {
  id: orderId,
  date: orderDate,
  status: 'Pesanan Dikonfirmasi',
  items: [...cartItems],
  total: total,
  statusColor: 'text-blue-500',
  orderDate: now,
  statusHistory: statusHistory,
  currentStep: 0,
  feedbackGiven: false
};

// Simpan order ke state orders
setOrders(prev => [newOrder, ...prev]);

// Simpan current order untuk tracking
setCurrentOrder(newOrder);

// Simpan order items untuk tracking
setLastOrderItems([...cartItems]);

// Kurangi saldo coins
setMemberPoints(prev => Math.max(0, prev - coinsUsed));

// Clear cart dan lanjut ke order tracking
setCartItems([]);
setOrderStatus('Pesanan Dikonfirmasi');
setCurrentScreen('order-tracking');

// Start automated status updates
startOrderStatusUpdates(newOrder);
};

const startOrderStatusUpdates = (order: Order) => {
  // Update status secara bertahap
  const statusSequence = [
    { status: 'Mencari Driver', delay: 30000, step: 1 }, // 30 detik
    { status: 'Mempersiapkan Pesanan', delay: 60000, step: 2 }, // 1 menit
    { status: 'Dalam Pengiriman', delay: 90000, step: 3 }, // 1.5 menit
    { status: 'Terkirim', delay: 120000, step: 4 } // 2 menit
  ];

  statusSequence.forEach(({ status, delay, step }) => {
    setTimeout(() => {
      const now = new Date();
      const formatTime = (date: Date) => {
        return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} WIB`;
      };

      setOrders(prev => prev.map(o => {
        if (o.id === order.id) {
          const updatedHistory = [
            ...(o.statusHistory || []),
            { status, time: formatTime(now) }
          ];
          return {
            ...o,
            status,
            currentStep: step,
            statusHistory: updatedHistory
          };
        }
        return o;
      }));

      setCurrentOrder(prev => {
        if (prev?.id === order.id) {
          const updatedHistory = [
            ...(prev.statusHistory || []),
            { status, time: formatTime(now) }
          ];
          return {
            ...prev,
            status,
            currentStep: step,
            statusHistory: updatedHistory
          };
        }
        return prev;
      });

      setOrderStatus(status);
    }, delay);
  });
};

const handleFeedbackSubmit = (orderId: string) => {
  setOrders(prev => prev.map(o => 
    o.id === orderId ? { ...o, feedbackGiven: true } : o
  ));
  
  if (currentOrder?.id === orderId) {
    setCurrentOrder(prev => prev ? { ...prev, feedbackGiven: true } : null);
  }
};

const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

const renderScreen = () => {
switch (currentScreen) {
case 'splash':
return <SplashScreen />;
case 'login':
return (
<LoginScreen
onLogin={handleLogin}
onNavigateToRegister={() => setCurrentScreen('register')}
/>
);
case 'register':
return (
<RegisterScreen
onRegister={handleRegister}
onNavigateToLogin={() => setCurrentScreen('login')}
/>
);
case 'location':
return (
<LocationScreen  
onConfirm={handleLocationConfirm}  
/>
);
case 'home':
return (
<>
<HomePage
user={user}
cartCount={cartCount}
onNavigateToBestDeals={() => setCurrentScreen('best-deals')}
onNavigateToRecipes={() => setCurrentScreen('recipe-list')}
onNavigateToCart={() => setCurrentScreen('cart')}
onNavigateToCategory={(category) => {
if (category === 'set-menu' || category === 'indonesian' || category === 'western') {
setSelectedMenuCategory(category as 'set-menu' | 'indonesian' | 'western');
setCurrentScreen('menu-list');
} else {
// Set kategori yang dipilih sebelum navigasi ke products
setSelectedProductCategory(category);
setCurrentScreen('products');
}
}}
onNavigateToRecipeDetail={(recipeId) => {
setSelectedRecipeId(recipeId);
setCurrentScreen('recipe-detail');
}}
onCheckIn={handleCheckIn}
memberPoints={memberPoints}
toggleFavorite={toggleFavorite}
isFavorite={isFavorite}
checkedInDays={checkedInDays}
/>
<FloatingMenu activeTab={activeMenuTab} onTabChange={handleMenuChange} />
</>
);
case 'best-deals':
return (
<>
<BestDeals
cartCount={cartCount}
onBack={() => setCurrentScreen('home')}
onAddToCart={addToCart}
onNavigateToCart={() => setCurrentScreen('cart')}
toggleFavorite={toggleFavorite}
isFavorite={isFavorite}
/>
<FloatingMenu activeTab={activeMenuTab} onTabChange={handleMenuChange} />
</>
);
case 'recipe-list':
return (
<>
<RecipeList
cartCount={cartCount}
onBack={() => setCurrentScreen('home')}
onRecipeSelect={(id) => {
setSelectedRecipeId(id);
setCurrentScreen('recipe-detail');
}}
onNavigateToCart={() => setCurrentScreen('cart')}
/>
<FloatingMenu activeTab={activeMenuTab} onTabChange={handleMenuChange} />
</>
);
case 'recipe-detail':
return (
<>
<RecipeDetail
recipeId={selectedRecipeId}
cartCount={cartCount}
onBack={() => setCurrentScreen('recipe-list')}
onAddToCart={addToCart}
onNavigateToCart={() => setCurrentScreen('cart')}
/>
<FloatingMenu activeTab={activeMenuTab} onTabChange={handleMenuChange} />
</>
);
case 'menu-list':
return (
<>
<MenuList
category={selectedMenuCategory}
cartCount={cartCount}
onBack={() => setCurrentScreen('home')}
onMenuSelect={(menuId) => {
setSelectedMenuId(menuId);
setCurrentScreen('menu-detail');
}}
onNavigateToCart={() => setCurrentScreen('cart')}
/>
<FloatingMenu activeTab={activeMenuTab} onTabChange={handleMenuChange} />
</>
);
case 'menu-detail':
return (
<>
<MenuDetail
menuId={selectedMenuId}
cartCount={cartCount}
onBack={() => setCurrentScreen('menu-list')}
onAddToCart={addToCart}
onNavigateToCart={() => setCurrentScreen('cart')}
/>
<FloatingMenu activeTab={activeMenuTab} onTabChange={handleMenuChange} />
</>
);
case 'cart':
return (
<>
<ShoppingCart
cartItems={cartItems}
onBack={() => setCurrentScreen('home')}
onCheckout={() => setCurrentScreen('checkout')}
onUpdateQuantity={updateCartQuantity}
onRemoveItem={removeFromCart}
/>
<FloatingMenu activeTab={activeMenuTab} onTabChange={handleMenuChange} />
</>
);
case 'checkout':
return (
<>
<CheckoutPage
cartItems={cartItems}
onBack={() => setCurrentScreen('cart')}
onConfirm={handleCheckout}
user={user}
memberPoints={memberPoints}
/>
<FloatingMenu activeTab={activeMenuTab} onTabChange={handleMenuChange} />
</>
);
case 'order-tracking':
return (
<>
<OrderTracking 
onBack={() => setCurrentScreen('home')}
onOpenChat={() => setCurrentScreen('chat-driver')}
onOpenFeedback={() => setCurrentScreen('feedback')}
orderStatus={orderStatus}
orderItems={lastOrderItems}
currentOrder={currentOrder}
/>
<FloatingMenu activeTab={activeMenuTab} onTabChange={handleMenuChange} />
</>
);
case 'favorite':
return (
<>
<FavoritePage
cartCount={cartCount}
onAddToCart={addToCart}
onNavigateToCart={() => setCurrentScreen('cart')}
favoriteItems={favoriteItems}
toggleFavorite={toggleFavorite}
/>
<FloatingMenu activeTab={activeMenuTab} onTabChange={handleMenuChange} />
</>
);
case 'products':
return (
<>
<ProductCategory
cartCount={cartCount}
onNavigateToCart={() => setCurrentScreen('cart')}
onAddToCart={addToCart}
toggleFavorite={toggleFavorite}
isFavorite={isFavorite}
initialCategory={selectedProductCategory}
/>
<FloatingMenu activeTab={activeMenuTab} onTabChange={handleMenuChange} />
</>
);
case 'my-orders':
return (
<>
<MyOrders 
  orders={orders}
  onOrderSelect={() => {
    setOrderStatus('Terkirim');
    setCurrentScreen('order-tracking');
  }} 
/>
<FloatingMenu activeTab={activeMenuTab} onTabChange={handleMenuChange} />
</>
);
case 'account':
return (
<>
<AccountPage 
user={user} 
onLogout={() => setCurrentScreen('login')}
onOpenSettings={() => setCurrentScreen('settings')}
onOpenSupport={() => setCurrentScreen('help-support')}
memberPoints={memberPoints}
onCheckIn={handleCheckIn}
onUpdateProfilePhoto={handleUpdateProfilePhoto}
/>
<FloatingMenu activeTab={activeMenuTab} onTabChange={handleMenuChange} />
</>
);
case 'settings':
return (
<SettingsPage
onBack={() => setCurrentScreen('account')}
onLogout={() => setCurrentScreen('login')}
user={user}
onUpdateUser={handleUpdateUser}
/>
);
case 'help-support':
return (
<HelpSupportPage
onBack={() => setCurrentScreen('account')}
onOpenChat={() => setCurrentScreen('chat-admin')}
/>
);
case 'chat-admin':
return (
<ChatAdmin
onBack={() => setCurrentScreen('help-support')}
/>
);
case 'chat-driver':
return (
<ChatDriver
onBack={() => setCurrentScreen('order-tracking')}
orderStatus={orderStatus}
currentOrder={currentOrder}
/>
);
case 'feedback':
return (
<FeedbackPage
onBack={() => setCurrentScreen('order-tracking')}
orderStatus={orderStatus}
onSubmit={handleFeedbackSubmit}
currentOrder={currentOrder}
/>
);
default:
return <SplashScreen />;
}
};

return <div className="min-h-screen bg-[#f0ead2]">{renderScreen()}</div>;
}