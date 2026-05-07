import { ArrowLeft, Send, Phone } from 'lucide-react';
import { useState } from 'react';
import { Order } from '../App';

interface ChatDriverProps {
  onBack: () => void;
  orderStatus?: string;
  currentOrder?: Order | null;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'driver';
  time: string;
}

export function ChatDriver({ onBack, orderStatus, currentOrder }: ChatDriverProps) {
  // Determine driver status based on order progress
  const getDriverStatus = () => {
    const step = currentOrder?.currentStep ?? 0;
    if (step >= 3) return 'Sedang Mengantar';
    if (step >= 2) return 'Menyiapkan Pesanan';
    if (step >= 1) return 'Driver Ditemukan';
    return 'Mencari Driver';
  };

  const driverStatus = getDriverStatus();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Halo! Saya Ahmad, driver Anda. Pesanan sudah saya ambil dan sedang dalam perjalanan.',
      sender: 'driver',
      time: '11:15',
    },
    {
      id: 2,
      text: 'Estimasi sampai dalam 15 menit.',
      sender: 'driver',
      time: '11:16',
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

      // Auto reply dari driver
      setTimeout(() => {
        let replyText = 'Baik, terima kasih informasinya.';
        
        if (userMsg.includes('mana') || userMsg.includes('posisi') || userMsg.includes('dimana')) {
          replyText = 'Saya sudah dekat dengan lokasi Anda, kurang lebih 5 menit lagi sampai.';
        } else if (userMsg.includes('lama') || userMsg.includes('kapan')) {
          replyText = 'Mohon maaf, ada sedikit traffic. InsyaAllah 10 menit lagi sampai.';
        } else if (userMsg.includes('terima kasih') || userMsg.includes('thanks') || userMsg.includes('makasih')) {
          replyText = 'Sama-sama! Terima kasih sudah order di Sayour Mart. 😊';
        } else if (userMsg.includes('bisa') || userMsg.includes('tolong') || userMsg.includes('minta')) {
          replyText = 'Baik, saya usahakan. Ada yang bisa saya bantu?';
        } else if (userMsg.includes('hati') || userMsg.includes('pelan')) {
          replyText = 'Siap, saya akan berhati-hati membawa pesanan Anda.';
        } else if (userMsg.includes('halo') || userMsg.includes('hai') || userMsg.includes('hello')) {
          replyText = 'Halo! Pesanan Anda sedang saya antar. Ada yang bisa saya bantu?';
        } else if (userMsg.includes('telepon') || userMsg.includes('call') || userMsg.includes('hubungi')) {
          replyText = 'Baik, saya akan hubungi Anda via telepon sebentar lagi.';
        }
        
        const driverResponse: Message = {
          id: messages.length + 2,
          text: replyText,
          sender: 'driver',
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, driverResponse]);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0ead2] pb-20 flex flex-col">
      {/* Header dengan Info Driver */}
      <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
        <div className="flex items-center gap-4 mb-3">
          <button onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-xl">Chat Kurir</h1>
        </div>
        
        {/* Driver Info Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <span className="text-2xl">🏍️</span>
            </div>
            <div>
              <p className="text-white">Ahmad Kurniawan</p>
              <p className="text-white/80 text-sm">Honda Beat • B 1234 XYZ</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <p className="text-white/90 text-xs">{driverStatus}</p>
              </div>
            </div>
          </div>
          <button className="bg-white text-[#adc178] p-2 rounded-full hover:bg-white/90">
            <Phone className="w-5 h-5" />
          </button>
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
              className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${
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
            placeholder="Ketik pesan ke kurir..."
            className="flex-1 px-4 py-2 border border-[#dde5b6] rounded-full focus:outline-none focus:border-[#adc178]"
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