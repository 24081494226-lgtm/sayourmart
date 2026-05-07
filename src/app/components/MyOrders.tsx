import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Order } from '../App';

interface MyOrdersProps {
  onOrderSelect: () => void;
  orders: Order[];
}

export function MyOrders({ onOrderSelect, orders }: MyOrdersProps) {
  // Helper untuk mendapatkan Icon berdasarkan status
  const getStatusIcon = (status: string) => {
    if (status === 'Dalam Pengiriman') return Clock;
    if (status === 'Selesai') return CheckCircle;
    if (status === 'Dibatalkan') return XCircle;
    return Clock;
  };

  return (
    <div className="min-h-screen bg-[#f0ead2] pb-20">
      {/* Header */}
      <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
        <h1 className="text-white text-xl">Pesanan Saya</h1>
      </div>

      <div className="px-6 py-6 space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-[#adc178] mx-auto mb-4 opacity-50" />
            <p className="text-[#6b7463]">Belum ada pesanan</p>
            <p className="text-[#6b7463] text-sm mt-2">
              Yuk mulai belanja di Sayour Mart!
            </p>
          </div>
        ) : (
          orders.map((order) => {
            const Icon = getStatusIcon(order.status);
            const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
            
            return (
              <button
                key={order.id}
                onClick={onOrderSelect}
                className="w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#dde5b6] p-3 rounded-lg">
                    <Package className="w-6 h-6 text-[#adc178]" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[#4a5742]">{order.id}</p>
                      <div className={`flex items-center gap-1 ${order.statusColor}`}>
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{order.status}</span>
                      </div>
                    </div>
                    <p className="text-[#6b7463] text-sm mb-2">{order.date}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6b7463] text-sm">{itemCount} item</span>
                      <span className="text-[#adc178]">
                        Rp {order.total.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
