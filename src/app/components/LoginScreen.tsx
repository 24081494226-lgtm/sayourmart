import image_acac2e17236730e86dc0f9e6383cca6de3d9434d from 'figma:asset/acac2e17236730e86dc0f9e6383cca6de3d9434d.png';
import image_0e82c96678074cfd74629537aa0ac0723f77e4b7 from 'figma:asset/0e82c96678074cfd74629537aa0ac0723f77e4b7.png';
import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import logoImage from 'figma:asset/dc876fe12f1da0fb4a781be2497566321560d1a7.png';

interface LoginScreenProps {
  onLogin: (name: string, email: string, password: string) => void;
  onNavigateToRegister: () => void;
}

export function LoginScreen({ onLogin, onNavigateToRegister }: LoginScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(name, email, password);
  };

  return (
    <div className="min-h-screen bg-[#f0ead2] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <img 
          src={image_acac2e17236730e86dc0f9e6383cca6de3d9434d} 
          alt="Sayour Mart" 
          className="w-24 h-24 mb-6 object-contain"
        />
        <h1 className="text-2xl mb-2 text-[#4a5742]">Selamat Datang</h1>
        <p className="text-[#6b7463] mb-8">Masuk untuk melanjutkan belanja</p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white border-[#dde5b6]"
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
            Masuk
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#6b7463]">
            Belum punya akun?{' '}
            <button
              onClick={onNavigateToRegister}
              className="text-[#adc178]"
            >
              Daftar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}