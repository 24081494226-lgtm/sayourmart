import image_acac2e17236730e86dc0f9e6383cca6de3d9434d from 'figma:asset/acac2e17236730e86dc0f9e6383cca6de3d9434d.png';
import image_14883a0aea426f395176d39d7c384c167a565a0f from 'figma:asset/14883a0aea426f395176d39d7c384c167a565a0f.png';
import image_676d70adea3fff1578be28016477f5eb98ab343a from 'figma:asset/676d70adea3fff1578be28016477f5eb98ab343a.png';
import { useState } from 'react';
import { User, Mail, Phone, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import logoImage from 'figma:asset/dc876fe12f1da0fb4a781be2497566321560d1a7.png';

interface RegisterScreenProps {
  onRegister: (name: string, email: string, phone: string, password: string) => void;
  onNavigateToLogin: () => void;
}

export function RegisterScreen({ onRegister, onNavigateToLogin }: RegisterScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(name, email, phone, password);
  };

  return (
    <div className="min-h-screen bg-[#f0ead2] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <img 
          src={image_acac2e17236730e86dc0f9e6383cca6de3d9434d} 
          alt="Sayour Mart" 
          className="w-20 h-20 mb-4 object-contain"
        />
        <h1 className="text-2xl mb-2 text-[#4a5742]">Buat Akun</h1>
        <p className="text-[#6b7463] mb-6">Daftar untuk mulai berbelanja</p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7463]" />
            <Input
              type="text"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10 bg-white border-[#dde5b6]"
              required
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7463]" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-white border-[#dde5b6]"
              required
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7463]" />
            <Input
              type="tel"
              placeholder="Nomor Telepon"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="pl-10 bg-white border-[#dde5b6]"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7463]" />
            <Input
              type="password"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 bg-white border-[#dde5b6]"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#adc178] hover:bg-[#9db066] text-white"
          >
            Daftar
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#6b7463]">
            Sudah punya akun?{' '}
            <button
              onClick={onNavigateToLogin}
              className="text-[#adc178]"
            >
              Masuk
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}