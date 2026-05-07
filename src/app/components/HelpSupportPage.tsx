import { ArrowLeft, MessageCircle, ChevronDown, ChevronUp, Upload } from 'lucide-react';
import { useState } from 'react';

interface HelpSupportPageProps {
  onBack: () => void;
  onOpenChat: () => void;
}

const faqs = [
  {
    question: 'Bagaimana cara melakukan pemesanan?',
    answer: 'Pilih produk yang ingin dibeli, tambahkan ke keranjang, lalu klik checkout untuk menyelesaikan pembayaran.',
  },
  {
    question: 'Bagaimana cara checkout bahan?',
    answer: 'Setelah memilih semua bahan, klik ikon keranjang di kanan atas, review pesanan Anda, lalu klik "Checkout" dan pilih metode pembayaran.',
  },
  {
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer: 'Kami menerima pembayaran melalui Transfer Bank, E-Wallet (GoPay, OVO, Dana), dan COD (Cash on Delivery).',
  },
  {
    question: 'Bagaimana cara mengecek status pengiriman?',
    answer: 'Buka menu "Orders", pilih pesanan yang ingin dilacak, dan lihat status pengiriman real-time dengan timeline lengkap.',
  },
  {
    question: 'Apa itu poin check-in?',
    answer: 'Poin check-in adalah reward yang Anda dapatkan setiap melakukan check-in harian. Setiap check-in memberikan 10 poin yang bisa ditukar dengan voucher.',
  },
  {
    question: 'Bagaimana cara chat dengan admin?',
    answer: 'Klik tombol "Chat Admin" di halaman bantuan atau di halaman tracking pesanan untuk berkomunikasi langsung dengan tim support kami.',
  },
  {
    question: 'Lupa password, bagaimana cara reset?',
    answer: 'Klik "Lupa Password" di halaman login, masukkan email Anda, dan kami akan mengirimkan link reset password.',
  },
  {
    question: 'Berapa lama estimasi pengiriman?',
    answer: 'Estimasi pengiriman adalah 1-2 jam untuk area Surabaya dan sekitarnya, tergantung lokasi dan ketersediaan driver.',
  },
];

export function HelpSupportPage({ onBack, onOpenChat }: HelpSupportPageProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'faq' | 'report' | 'feedback'>('faq');
  const [reportForm, setReportForm] = useState({
    category: '',
    description: '',
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [feedbackForm, setFeedbackForm] = useState({
    message: '',
  });

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleReportSubmit = () => {
    if (reportForm.category && reportForm.description) {
      alert('Laporan berhasil dikirim! Tim kami akan segera menindaklanjuti.');
      setReportForm({ category: '', description: '', image: null });
      setImagePreview(null);
    } else {
      alert('Mohon lengkapi semua field');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReportForm({ ...reportForm, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFeedbackSubmit = () => {
    if (feedbackForm.message) {
      alert('Terima kasih atas saran Anda!');
      setFeedbackForm({ message: '' });
    } else {
      alert('Mohon isi saran Anda');
    }
  };

  return (
    <div className="min-h-screen bg-[#f0ead2] pb-20">
      <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-xl">Bantuan & Dukungan</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Chat Admin Button */}
        <button
          onClick={onOpenChat}
          className="w-full bg-[#adc178] text-white p-4 rounded-xl shadow-md flex items-center justify-center gap-2 hover:bg-[#9db066]"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Chat dengan Admin</span>
        </button>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex border-b border-[#dde5b6]">
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex-1 py-3 ${
                activeTab === 'faq'
                  ? 'bg-[#adc178] text-white'
                  : 'text-[#4a5742]'
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`flex-1 py-3 ${
                activeTab === 'report'
                  ? 'bg-[#adc178] text-white'
                  : 'text-[#4a5742]'
              }`}
            >
              Laporkan Masalah
            </button>
            <button
              onClick={() => setActiveTab('feedback')}
              className={`flex-1 py-3 ${
                activeTab === 'feedback'
                  ? 'bg-[#adc178] text-white'
                  : 'text-[#4a5742]'
              }`}
            >
              Saran
            </button>
          </div>

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="p-4 space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#dde5b6] pb-3 last:border-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <span className="text-[#4a5742]">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[#adc178]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#adc178]" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <p className="text-[#6b7463] text-sm mt-2 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Report Tab */}
          {activeTab === 'report' && (
            <div className="p-4 space-y-4">
              <div>
                <label className="text-[#4a5742] text-sm mb-2 block">Kategori Masalah</label>
                <select
                  value={reportForm.category}
                  onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })}
                  className="w-full px-4 py-2 border border-[#dde5b6] rounded-lg"
                >
                  <option value="">Pilih Kategori</option>
                  <option value="order">Masalah Pesanan</option>
                  <option value="payment">Masalah Pembayaran</option>
                  <option value="delivery">Masalah Pengiriman</option>
                  <option value="product">Masalah Produk</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="text-[#4a5742] text-sm mb-2 block">Deskripsi Masalah</label>
                <textarea
                  value={reportForm.description}
                  onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                  className="w-full px-4 py-2 border border-[#dde5b6] rounded-lg h-32"
                  placeholder="Jelaskan masalah Anda secara detail..."
                />
              </div>
              <div>
                <label className="text-[#4a5742] text-sm mb-2 block">Upload Foto (Opsional)</label>
                <label htmlFor="image-upload" className="block cursor-pointer">
                  <div className="border-2 border-dashed border-[#dde5b6] rounded-lg p-6 text-center hover:bg-[#f0ead2]/50">
                    {imagePreview ? (
                      <div className="space-y-2">
                        <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg mx-auto" />
                        <p className="text-[#adc178] text-sm">Foto berhasil diupload</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mx-auto text-[#adc178] mb-2" />
                        <p className="text-[#6b7463] text-sm">Klik untuk upload foto</p>
                      </>
                    )}
                  </div>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {imagePreview && (
                  <button
                    onClick={() => {
                      setReportForm({ ...reportForm, image: null });
                      setImagePreview(null);
                    }}
                    className="mt-2 text-red-500 text-sm"
                  >
                    Hapus foto
                  </button>
                )}
              </div>
              <button
                onClick={handleReportSubmit}
                className="w-full bg-[#adc178] text-white py-3 rounded-lg hover:bg-[#9db066]"
              >
                Kirim Laporan
              </button>
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <div className="p-4 space-y-4">
              <div>
                <label className="text-[#4a5742] text-sm mb-2 block">Saran & Masukan</label>
                <textarea
                  value={feedbackForm.message}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                  className="w-full px-4 py-2 border border-[#dde5b6] rounded-lg h-32"
                  placeholder="Bagikan saran Anda untuk kami..."
                />
              </div>
              <button
                onClick={handleFeedbackSubmit}
                className="w-full bg-[#adc178] text-white py-3 rounded-lg hover:bg-[#9db066]"
              >
                Kirim Saran
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
