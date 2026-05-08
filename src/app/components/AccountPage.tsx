import image_958fc9b5e3a016faefc087bfc782c748cdffab40 from 'figma:asset/958fc9b5e3a016faefc087bfc782c748cdffab40.png';
import image_0e82c96678074cfd74629537aa0ac0723f77e4b7 from 'figma:asset/0e82c96678074cfd74629537aa0ac0723f77e4b7.png';
import image_d2cc94e95d6ed9101f60b441ddefdd45e0f3d019 from 'figma:asset/d2cc94e95d6ed9101f60b441ddefdd45e0f3d019.png';
// FIXED ACCOUNT PAGE (tanpa Riwayat Pesanan, menu bisa diklik,
// lokasi Surabaya, voucher click OK)

import { User as UserType } from '../App';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
  CheckCircle,
  X,
  Camera,
} from 'lucide-react';
import logoImage from 'figma:asset/dc876fe12f1da0fb4a781be2497566321560d1a7.png';
import { useState } from 'react';

interface AccountPageProps {
  user: UserType | null;
  onLogout: () => void;
  onOpenSettings: () => void;
  onOpenSupport: () => void;
  memberPoints: number;
  onCheckIn: () => void;
  onUpdateProfilePhoto: (photoUrl: string) => void;
}

export function AccountPage({ user, onLogout, onOpenSettings, onOpenSupport, memberPoints, onUpdateProfilePhoto }: AccountPageProps) {
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [claimedVouchers, setClaimedVouchers] = useState<string[]>([]);

  const vouchers = [
    { id: 'DISC10', title: 'Diskon 10%', detail: 'Min. belanja 20.000' },
    { id: 'ONGKIR', title: 'Gratis Ongkir', detail: 'Tanpa minimum belanja' },
  ];

  const memberLevel =
    memberPoints >= 100 ? 'Gold' : memberPoints >= 50 ? 'Silver' : 'Bronze';

  // VOUCHER CLAIM
  const handleClaimVoucher = (id: string) => {
    if (!claimedVouchers.includes(id)) {
      setClaimedVouchers([...claimedVouchers, id]);
    }
  };

  // GANTI FOTO PROFIL
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // MENU ITEMS (SUDAH DIEDIT SESUAI PERMINTAAN)
  const menuItems = [
    { icon: Settings, label: 'Pengaturan', action: onOpenSettings },
    { icon: HelpCircle, label: 'Bantuan & Dukungan', action: onOpenSupport },
    { icon: LogOut, label: 'Keluar', action: onLogout, danger: true },
  ];

  // LOKASI SURABAYA (UPDATED)
  const displayLocation =
    user?.location ||
    'Gubeng, Surabaya'; // default lokasi

  return (
    <div className="min-h-screen bg-[#f0ead2] pb-20">

      {/* HEADER */}
      <div className="bg-[#adc178] px-6 py-8 rounded-b-3xl shadow-md">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src={user?.profilePhoto || image_958fc9b5e3a016faefc087bfc782c748cdffab40}
              alt="Profile"
              className="w-20 h-20 object-cover bg-white rounded-full p-2"
            />
            <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full cursor-pointer shadow-md hover:bg-gray-100">
              <Camera className="w-4 h-4 text-[#adc178]" />
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          <h2 className="text-white text-xl mb-1">{user?.name || 'User'}</h2>
          <p className="text-white/90 text-sm">{user?.email || ''}</p>

          <div className="mt-2 px-3 py-1 rounded-full bg-white/30 text-white text-xs">
            Level Member: <span className="font-semibold">{memberLevel}</span>
          </div>
          
          <div className="mt-2 text-white text-sm text-center">
            <p>Total Poin: <span className="font-semibold">{memberPoints}</span></p>
            <p className="text-xs text-white/80 mt-1">1x Check-in = +10 poin</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">

        {/* PROFILE INFO */}
        <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
          <h3 className="text-[#4a5742] mb-4">Informasi Profil</h3>

          <div className="flex items-center gap-3 pb-3 border-b border-[#dde5b6]">
            <User className="w-5 h-5 text-[#adc178]" />
            <div>
              <p className="text-xs text-[#6b7463]">Nama</p>
              <p className="text-[#4a5742] text-[16px]">{user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pb-3 border-b border-[#dde5b6]">
            <Mail className="w-5 h-5 text-[#adc178]" />
            <div>
              <p className="text-xs text-[#6b7463]">Email</p>
              <p className="text-[#4a5742]">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pb-3 border-b border-[#dde5b6]">
            <Phone className="w-5 h-5 text-[#adc178]" />
            <div>
              <p className="text-xs text-[#6b7463]">Telepon</p>
              <p className="text-[#4a5742]">{user?.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#adc178]" />
            <div>
              <p className="text-xs text-[#6b7463]">Lokasi</p>
              <p className="text-[#4a5742]">{displayLocation}</p>
            </div>
          </div>
        </div>

        {/* VOUCHER BUTTON */}
        <button
          onClick={() => setShowVoucherModal(true)}
          className="bg-white w-full p-5 rounded-xl shadow-md text-left"
        >
          <p className="font-medium text-[#4a5742]">Voucher</p>
          <p className="text-sm text-[#6b7463]">Klik untuk lihat voucher</p>
        </button>

        {/* MENU ITEMS (PENGATURAN, BANTUAN, LOGOUT) */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className={`w-full flex items-center justify-between p-4 
                  ${index < menuItems.length - 1 ? 'border-b border-[#dde5b6]' : ''}
                  ${item.danger ? 'text-red-500' : 'text-[#4a5742]'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#6b7463]" />
              </button>
            );
          })}
        </div>

        <p className="text-center text-[#6b7463] text-sm">Sayour Mart v1.0.0</p>
      </div>

      {/* VOUCHER MODAL */}
      {showVoucherModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-80 p-6 rounded-2xl shadow-lg relative">
            <button
              onClick={() => setShowVoucherModal(false)}
              className="absolute right-3 top-3 text-gray-500"
            >
              <X />
            </button>

            <h3 className="text-[#4a5742] font-semibold text-center mb-4">
              Voucher Tersedia
            </h3>

            <div className="space-y-3">
              {vouchers.map((v) => (
                <div
                  key={v.id}
                  className="border p-4 rounded-xl bg-[#f9f9f5] flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-[#4a5742]">{v.title}</p>
                    <p className="text-xs text-[#6b7463]">{v.detail}</p>
                  </div>

                  {claimedVouchers.includes(v.id) ? (
                    <CheckCircle className="text-green-600 w-6 h-6" />
                  ) : (
                    <button
                      onClick={() => handleClaimVoucher(v.id)}
                      className="text-[#adc178] text-sm px-3 py-1 border rounded-xl"
                    >
                      Klaim
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
