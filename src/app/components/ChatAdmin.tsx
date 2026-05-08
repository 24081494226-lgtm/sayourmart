import { ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';

interface ChatAdminProps {
  onBack: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'admin';
  time: string;
}

export function ChatAdmin({ onBack }: ChatAdminProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Halo! Selamat datang di Sayour Mart. Ada yang bisa kami bantu?',
      sender: 'admin',
      time: '10:00',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      const userMsg = inputMessage.toLowerCase();
      setInputMessage('');

      // Contextual auto reply
      setTimeout(() => {
        let replyText = 'Terima kasih atas pesan Anda. Admin kami akan segera merespons.';
        
        if (userMsg.includes('pesanan') || userMsg.includes('order')) {
          replyText = 'Untuk mengecek status pesanan Anda, silakan buka menu "Orders" atau bisa saya bantu cek dengan nomor pesanan Anda.';
        } else if (userMsg.includes('batal') || userMsg.includes('cancel')) {
          replyText = 'Untuk membatalkan pesanan, pastikan status masih "Menunggu Konfirmasi". Bisa berikan nomor pesanan Anda?';
        } else if (userMsg.includes('bayar') || userMsg.includes('payment')) {
          replyText = 'Kami menerima pembayaran via Transfer Bank, E-Wallet (GoPay/OVO/Dana), dan COD. Ada yang bisa dibantu terkait pembayaran?';
        } else if (userMsg.includes('kirim') || userMsg.includes('ongkir') || userMsg.includes('delivery')) {
          replyText = 'Estimasi pengiriman 1-2 jam untuk area Surabaya. Ongkir dimulai dari Rp 5.000. Ada yang ingin ditanyakan?';
        } else if (userMsg.includes('produk') || userMsg.includes('barang')) {
          replyText = 'Kami menyediakan sayur, buah, protein, bumbu, dan menu siap masak. Produk mana yang Anda cari?';
        } else if (userMsg.includes('halo') || userMsg.includes('hai') || userMsg.includes('hello')) {
          replyText = 'Halo! Selamat datang di Sayour Mart. Ada yang bisa saya bantu hari ini?';
        } else if (userMsg.includes('terima kasih') || userMsg.includes('thanks')) {
          replyText = 'Sama-sama! Senang bisa membantu. Jangan ragu hubungi kami lagi jika ada pertanyaan. 😊';
        } else if (userMsg.includes('promo') || userMsg.includes('diskon') || userMsg.includes('voucher')) {
          replyText = 'Saat ini kami punya voucher diskon hingga 20%! Cek menu "Account" untuk klaim voucher Anda.';
        }
        
        const adminResponse: Message = {
          id: messages.length + 2,
          text: replyText,
          sender: 'admin',
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, adminResponse]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0ead2] pb-20 flex flex-col">
      <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white text-xl">Chat Admin</h1>
            <p className="text-white/80 text-sm">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-[#adc178] text-white'
                  : 'bg-white text-[#4a5742]'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-[#6b7463]'
                }`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white px-6 py-4 border-t border-[#dde5b6]">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ketik pesan..."
            className="flex-1 px-4 py-2 border border-[#dde5b6] rounded-full"
          />
          <button
            onClick={handleSend}
            className="bg-[#adc178] text-white p-2 rounded-full hover:bg-[#9db066]"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}