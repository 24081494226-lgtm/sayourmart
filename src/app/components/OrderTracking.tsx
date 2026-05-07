import { ArrowLeft, Package, CheckCircle, Truck, Home, MessageCircle, Star, Search, ChefHat } from 'lucide-react';
import { Button } from './ui/button';
import { CartItem, Order } from '../App';
import { useEffect, useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './ui/sonner';

interface OrderTrackingProps {
  onBack: () => void;
  onOpenChat: () => void;
  onOpenFeedback: () => void;
  orderStatus?: string;
  orderItems: CartItem[];
  currentOrder?: Order | null;
}

export function OrderTracking({ onBack, onOpenChat, onOpenFeedback, orderStatus, orderItems, currentOrder }: OrderTrackingProps) {
  const [localStatus, setLocalStatus] = useState(orderStatus);
  const [previousStep, setPreviousStep] = useState(-1);

  // Update local status when orderStatus changes
  useEffect(() => {
    setLocalStatus(orderStatus);
  }, [orderStatus]);

  // Show toast notification when status changes
  useEffect(() => {
    const currentStep = currentOrder?.currentStep ?? -1;
    
    if (currentStep > previousStep && previousStep >= 0) {
      const statusMessages: Record<number, string> = {
        1: '🔍 Sedang mencari driver untuk pesanan Anda...',
        2: '👨‍🍳 Pesanan sedang disiapkan dengan hati-hati',
        3: '🚚 Driver sedang dalam perjalanan ke lokasi Anda',
        4: '✅ Pesanan telah sampai! Selamat menikmati'
      };
      
      const message = statusMessages[currentStep];
      if (message) {
        toast.success(message, {
          duration: 4000,
          position: 'top-center'
        });
      }
    }
    
    setPreviousStep(currentStep);
  }, [currentOrder?.currentStep]);

  const getTrackingSteps = () => {
    const statusHistory = currentOrder?.statusHistory || [];
    const currentStep = currentOrder?.currentStep ?? 0;

    return [
      { 
        icon: CheckCircle, 
        label: 'Pesanan Dikonfirmasi', 
        time: statusHistory.find(s => s.status === 'Pesanan Dikonfirmasi')?.time || '00:00 WIB', 
        completed: currentStep >= 0 
      },
      { 
        icon: Search, 
        label: 'Mencari Driver', 
        time: statusHistory.find(s => s.status === 'Mencari Driver')?.time || 'Menunggu...', 
        completed: currentStep >= 1 
      },
      { 
        icon: ChefHat, 
        label: 'Mempersiapkan Pesanan', 
        time: statusHistory.find(s => s.status === 'Mempersiapkan Pesanan')?.time || 'Menunggu...', 
        completed: currentStep >= 2 
      },
      { 
        icon: Truck, 
        label: 'Dalam Pengiriman', 
        time: statusHistory.find(s => s.status === 'Dalam Pengiriman')?.time || 'Menunggu...', 
        completed: currentStep >= 3 
      },
      { 
        icon: Home, 
        label: 'Terkirim', 
        time: statusHistory.find(s => s.status === 'Terkirim')?.time || 'Estimasi tiba', 
        completed: currentStep >= 4 
      },
    ];
  };

  const trackingSteps = getTrackingSteps();

  // Hitung total dari orderItems
  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Check if feedback button should be shown
  const showFeedbackButton = localStatus === 'Terkirim' && !currentOrder?.feedbackGiven;

  return (
    <div className="min-h-screen bg-[#f0ead2] pb-20">
      <Toaster />
      
      {/* Header */}
      <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-xl">Lacak Pesanan</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* QR Code */}
        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <p className="text-[#6b7463] text-sm mb-4">ID Pesanan: {currentOrder?.id || '#ORD20241118001'}</p>
          <div className="w-48 h-48 mx-auto bg-[#dde5b6] rounded-lg flex items-center justify-center mb-4">
            <div className="text-[#4a5742]">
              <div className="grid grid-cols-3 gap-1 w-32 h-32">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${
                      i % 2 === 0 ? 'bg-[#4a5742]' : 'bg-transparent'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[#4a5742]">Tunjukkan kode ini ke driver</p>
        </div>

        {/* Tracking Steps */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-[#4a5742] mb-6">Status Pengiriman</h3>
          <div className="space-y-6">
            {trackingSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        step.completed
                          ? 'bg-[#adc178] text-white'
                          : 'bg-[#dde5b6] text-[#6b7463]'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div
                        className={`w-0.5 h-12 transition-all ${
                          step.completed ? 'bg-[#adc178]' : 'bg-[#dde5b6]'
                        }`}
                      ></div>
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <p
                      className={
                        step.completed ? 'text-[#4a5742]' : 'text-[#6b7463]'
                      }
                    >
                      {step.label}
                    </p>
                    <p className="text-[#6b7463] text-sm">{step.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Driver Info - Only show when driver is found */}
        {currentOrder && currentOrder.currentStep !== undefined && currentOrder.currentStep >= 2 && (
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-[#4a5742] mb-4">Informasi Driver</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#dde5b6] flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div className="flex-1">
                <p className="text-[#4a5742]">Ahmad Kurniawan</p>
                <p className="text-[#6b7463] text-sm">Honda Beat • B 1234 XYZ</p>
              </div>
              <button className="bg-[#adc178] text-white px-4 py-2 rounded-lg text-sm" onClick={onOpenChat}>
                Hubungi
              </button>
            </div>
          </div>
        )}

        {/* Order Items */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-[#4a5742] mb-4">Item Pesanan</h3>
          <div className="space-y-3">
            {orderItems.map((item, index) => (
              <div key={index} className="flex justify-between text-[#6b7463]">
                <span>{item.quantity}x {item.name}</span>
                <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
              </div>
            ))}
            <div className="border-t border-[#dde5b6] pt-3 flex justify-between text-[#4a5742]">
              <span>Total</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* Feedback Button */}
        {showFeedbackButton && (
          <div className="text-center">
            <Button
              className="bg-[#adc178] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#9db066]"
              onClick={onOpenFeedback}
            >
              <Star className="w-4 h-4 mr-2 inline" />
              Berikan Feedback
            </Button>
          </div>
        )}

        {/* Feedback Already Given */}
        {localStatus === 'Terkirim' && currentOrder?.feedbackGiven && (
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-[#adc178] mb-2">
              <CheckCircle className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-[#4a5742]">Terima kasih atas feedback Anda!</p>
            <p className="text-[#6b7463] text-sm mt-1">Pesanan telah selesai</p>
          </div>
        )}
      </div>
    </div>
  );
}
