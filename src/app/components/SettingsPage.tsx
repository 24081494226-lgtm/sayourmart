import { ArrowLeft, User, Lock, MapPin, Bell, Shield, Info, LogOut, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SettingsPageProps {
  onBack: () => void;
  onLogout: () => void;
  user: any;
  onUpdateUser: (userData: any) => void;
}

export function SettingsPage({ onBack, onLogout, user, onUpdateUser }: SettingsPageProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    address: user?.location || '',
  });

  const handleEditProfile = () => {
    onUpdateUser({ ...user, name: formData.name, email: formData.email, phone: formData.phone });
    setActiveSection(null);
  };

  const handleChangePassword = () => {
    if (formData.newPassword === formData.confirmPassword) {
      alert('Password berhasil diubah!');
      setActiveSection(null);
    } else {
      alert('Password tidak cocok!');
    }
  };

  const handleSaveAddress = () => {
    onUpdateUser({ ...user, location: formData.address });
    setActiveSection(null);
  };

  if (activeSection === 'edit-profile') {
    return (
      <div className="min-h-screen bg-[#f0ead2] pb-20">
        <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveSection(null)} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-white text-xl">Edit Profil</h1>
          </div>
        </div>

        <div className="px-6 py-6 space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
            <div>
              <label className="text-[#4a5742] text-sm mb-2 block">Nama</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-[#dde5b6] rounded-lg"
              />
            </div>
            <div>
              <label className="text-[#4a5742] text-sm mb-2 block">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-[#dde5b6] rounded-lg"
              />
            </div>
            <div>
              <label className="text-[#4a5742] text-sm mb-2 block">Telepon</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-[#dde5b6] rounded-lg"
              />
            </div>
            <button
              onClick={handleEditProfile}
              className="w-full bg-[#adc178] text-white py-3 rounded-lg hover:bg-[#9db066]"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === 'change-password') {
    return (
      <div className="min-h-screen bg-[#f0ead2] pb-20">
        <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveSection(null)} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-white text-xl">Ubah Password</h1>
          </div>
        </div>

        <div className="px-6 py-6 space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
            <div>
              <label className="text-[#4a5742] text-sm mb-2 block">Password Lama</label>
              <input
                type="password"
                value={formData.oldPassword}
                onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                className="w-full px-4 py-2 border border-[#dde5b6] rounded-lg"
              />
            </div>
            <div>
              <label className="text-[#4a5742] text-sm mb-2 block">Password Baru</label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="w-full px-4 py-2 border border-[#dde5b6] rounded-lg"
              />
            </div>
            <div>
              <label className="text-[#4a5742] text-sm mb-2 block">Konfirmasi Password Baru</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border border-[#dde5b6] rounded-lg"
              />
            </div>
            <button
              onClick={handleChangePassword}
              className="w-full bg-[#adc178] text-white py-3 rounded-lg hover:bg-[#9db066]"
            >
              Ubah Password
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === 'manage-address') {
    return (
      <div className="min-h-screen bg-[#f0ead2] pb-20">
        <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveSection(null)} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-white text-xl">Kelola Alamat</h1>
          </div>
        </div>

        <div className="px-6 py-6 space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
            <div>
              <label className="text-[#4a5742] text-sm mb-2 block">Alamat Pengiriman</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border border-[#dde5b6] rounded-lg h-32"
                placeholder="Masukkan alamat lengkap..."
              />
            </div>
            <button
              onClick={handleSaveAddress}
              className="w-full bg-[#adc178] text-white py-3 rounded-lg hover:bg-[#9db066]"
            >
              Simpan Alamat
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === 'privacy-policy') {
    return (
      <div className="min-h-screen bg-[#f0ead2] pb-20">
        <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveSection(null)} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-white text-xl">Kebijakan Privasi</h1>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
            <h3 className="text-[#4a5742]">Kebijakan Privasi Sayour Mart</h3>
            <p className="text-[#6b7463] text-sm leading-relaxed">
              Sayour Mart berkomitmen untuk melindungi privasi Anda. Kami mengumpulkan data pribadi
              hanya untuk keperluan transaksi dan pengiriman produk.
            </p>
            <p className="text-[#6b7463] text-sm leading-relaxed">
              Data Anda tidak akan dibagikan kepada pihak ketiga tanpa izin Anda. Kami menggunakan
              enkripsi untuk melindungi informasi Anda.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === 'about') {
    return (
      <div className="min-h-screen bg-[#f0ead2] pb-20">
        <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveSection(null)} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-white text-xl">Tentang Aplikasi</h1>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="bg-white rounded-xl p-6 shadow-md space-y-4 text-center">
            <h3 className="text-[#4a5742] text-xl">Sayour Mart</h3>
            <p className="text-[#6b7463]">Versi 1.0.0</p>
            <p className="text-[#6b7463] text-sm leading-relaxed">
              Sayour Mart adalah aplikasi belanja bahan makanan segar yang memudahkan Anda
              mendapatkan produk berkualitas langsung ke rumah.
            </p>
            <p className="text-[#6b7463] text-sm">© 2024 Sayour Mart. All rights reserved.</p>
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
          <h1 className="text-white text-xl">Pengaturan</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <button
            onClick={() => setActiveSection('edit-profile')}
            className="w-full flex items-center justify-between p-4 border-b border-[#dde5b6]"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-[#adc178]" />
              <span className="text-[#4a5742]">Edit Profil</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#6b7463]" />
          </button>

          <button
            onClick={() => setActiveSection('change-password')}
            className="w-full flex items-center justify-between p-4 border-b border-[#dde5b6]"
          >
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#adc178]" />
              <span className="text-[#4a5742]">Ubah Password</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#6b7463]" />
          </button>

          <button
            onClick={() => setActiveSection('manage-address')}
            className="w-full flex items-center justify-between p-4 border-b border-[#dde5b6]"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#adc178]" />
              <span className="text-[#4a5742]">Kelola Alamat Pengiriman</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#6b7463]" />
          </button>

          <button
            onClick={() => alert('Izin lokasi diaktifkan')}
            className="w-full flex items-center justify-between p-4 border-b border-[#dde5b6]"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#adc178]" />
              <span className="text-[#4a5742]">Izin Lokasi</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#6b7463]" />
          </button>

          <button
            onClick={() => setActiveSection('privacy-policy')}
            className="w-full flex items-center justify-between p-4 border-b border-[#dde5b6]"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#adc178]" />
              <span className="text-[#4a5742]">Kebijakan Privasi</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#6b7463]" />
          </button>

          <button
            onClick={() => setActiveSection('about')}
            className="w-full flex items-center justify-between p-4 border-b border-[#dde5b6]"
          >
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-[#adc178]" />
              <span className="text-[#4a5742]">Tentang Aplikasi</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#6b7463]" />
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-between p-4 text-red-500"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
