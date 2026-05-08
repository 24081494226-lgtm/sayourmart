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
| 'menu-list'
| 'menu-detail'
| 'feedback';

export interface User {
name: string;
email: string;
phone: string;
location: string;
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

export default function App() {
const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
const [user, setUser] = useState<User | null>(null);
const [selectedRecipeId, setSelectedRecipeId] = useState<string>('');
const [selectedMenuId, setSelectedMenuId] = useState<string>('');
const [selectedMenuCategory, setSelectedMenuCategory] = useState<'set-menu' | 'indonesian' | 'western'>('set-menu');
const [activeMenuTab, setActiveMenuTab] = useState<'home' | 'favorite' | 'products' | 'orders' | 'account'>('home');
const [cartItems, setCartItems] = useState<CartItem[]>([]);
const [memberPoints, setMemberPoints] = useState(0);
const [orderStatus, setOrderStatus] = useState('Dalam Pengiriman');

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

const handleLocationConfirm = (location: string) => {
if (user) {
setUser({ ...user, location });
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
setMemberPoints(prev => prev + 10);
};

const handleUpdateUser = (userData: User) => {
setUser(userData);
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
setCurrentScreen('products');
}
}}
onNavigateToRecipeDetail={(recipeId) => {
setSelectedRecipeId(recipeId);
setCurrentScreen('recipe-detail');
}}
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
onConfirm={() => {
setOrderStatus('Dalam Pengiriman');
setCurrentScreen('order-tracking');
}}
/>
<FloatingMenu activeTab={activeMenuTab} onTabChange={handleMenuChange} />
</>
);
case 'order-tracking':
return (
<>
<OrderTracking 
onBack={() => setCurrentScreen('home')}
onOpenChat={() => setCurrentScreen('chat-admin')}
onOpenFeedback={() => setCurrentScreen('feedback')}
orderStatus={orderStatus}
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
/>
<FloatingMenu activeTab={activeMenuTab} onTabChange={handleMenuChange} />
</>
);
case 'my-orders':
return (
<>
<MyOrders onOrderSelect={() => {
setOrderStatus('Terkirim');
setCurrentScreen('order-tracking');
}} />
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
onBack={() => setCurrentScreen(currentScreen === 'order-tracking' ? 'order-tracking' : 'help-support')}
/>
);
case 'feedback':
return (
<FeedbackPage
onBack={() => setCurrentScreen('order-tracking')}
orderStatus={orderStatus}
/>
);
default:
return <SplashScreen />;
}
};

return <div className="min-h-screen bg-[#f0ead2]">{renderScreen()}</div>;
}
