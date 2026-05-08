import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { CartItem } from '../App';

interface ShoppingCartProps {
  cartItems: CartItem[];
  onBack: () => void;
  onCheckout: () => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
}

export function ShoppingCart({ cartItems, onBack, onCheckout, onUpdateQuantity, onRemoveItem }: ShoppingCartProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 10000;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-[#f0ead2] pb-20">
      {/* Header */}
      <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-xl">Keranjang Belanja</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-md text-center">
            <p className="text-[#6b7463]">Keranjang Anda masih kosong</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-4 shadow-md">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg flex-shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-[#4a5742]">{item.name}</h3>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[#adc178] mb-3">
                        Rp {item.price.toLocaleString('id-ID')}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full bg-[#dde5b6] flex items-center justify-center text-[#4a5742]"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-[#4a5742]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full bg-[#adc178] flex items-center justify-center text-white"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[#4a5742]">
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl p-6 shadow-md space-y-3">
              <h3 className="text-[#4a5742] mb-4">Ringkasan Pesanan</h3>
              <div className="flex justify-between text-[#6b7463]">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-[#6b7463]">
                <span>Biaya Pengiriman</span>
                <span>Rp {deliveryFee.toLocaleString('id-ID')}</span>
              </div>
              <div className="border-t border-[#dde5b6] pt-3 flex justify-between text-[#4a5742]">
                <span>Total</span>
                <span>Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <Button 
              onClick={onCheckout}
              className="w-full bg-[#adc178] hover:bg-[#9db066] text-white"
            >
              Lanjut ke Pembayaran
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
