import { ArrowLeft, Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Order } from '../App';

interface FeedbackPageProps {
  onBack: () => void;
  orderStatus: string;
  onSubmit?: (orderId: string) => void;
  currentOrder?: Order | null;
}

export function FeedbackPage({ onBack, orderStatus, onSubmit, currentOrder }: FeedbackPageProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Mohon berikan rating terlebih dahulu');
      return;
    }
    
    // Call onSubmit callback if provided
    if (onSubmit && currentOrder?.id) {
      onSubmit(currentOrder.id);
    }
    
    alert('Terima kasih atas ulasan Anda!');
    setRating(0);
    setComment('');
    onBack();
  };

  // Only show feedback if order is delivered
  if (orderStatus !== 'Terkirim' && orderStatus !== 'Selesai') {
    return (
      <div className="min-h-screen bg-[#f0ead2] pb-20">
        <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-white text-xl">Ulasan</h1>
          </div>
        </div>

        <div className="px-6 py-20 text-center">
          <div className="bg-white rounded-xl p-8 shadow-md">
            <p className="text-[#4a5742] text-lg mb-2">Ulasan Belum Tersedia</p>
            <p className="text-[#6b7463]">
              Anda dapat memberikan ulasan setelah pesanan selesai dikirim
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0ead2] pb-20">
      <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-xl">Berikan Ulasan</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-[#4a5742] text-center mb-6">Bagaimana pengalaman Anda?</h3>
          
          {/* Rating Stars */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-12 h-12 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>

          <p className="text-center text-[#6b7463] mb-6">
            {rating === 0 && 'Pilih rating Anda'}
            {rating === 1 && 'Sangat Buruk'}
            {rating === 2 && 'Buruk'}
            {rating === 3 && 'Cukup'}
            {rating === 4 && 'Baik'}
            {rating === 5 && 'Sangat Baik'}
          </p>

          {/* Comment */}
          <div className="mb-6">
            <label className="text-[#4a5742] mb-2 block">Komentar (opsional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 border border-[#dde5b6] rounded-lg h-32"
              placeholder="Ceritakan pengalaman Anda..."
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-[#adc178] hover:bg-[#9db066] text-white"
          >
            Kirim Ulasan
          </Button>
        </div>

        {/* Order Info */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-[#4a5742] mb-4">Informasi Pesanan</h3>
          <div className="space-y-2 text-[#6b7463] text-sm">
            <div className="flex justify-between">
              <span>ID Pesanan</span>
              <span className="text-[#4a5742]">#ORD20241118001</span>
            </div>
            <div className="flex justify-between">
              <span>Tanggal</span>
              <span className="text-[#4a5742]">18 Nov 2024</span>
            </div>
            <div className="flex justify-between">
              <span>Status</span>
              <span className="text-green-500">{orderStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}