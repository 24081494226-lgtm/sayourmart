import { useState } from 'react';
import { MapPin, Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface LocationScreenProps {
  onConfirm: (location: string, fullAddress: AddressData) => void;
}

export interface AddressData {
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  street: string;
  detail: string;
}

const specificLocations = [
  'Wonokromo',
  'Jetis Kulon',
  'Jemur Wonosari',
  'Ketintang',
  'Gubeng',
  'Tegalsari',
  'Genteng',
  'Rungkut',
  'Sukolilo',
  'Mulyorejo',
];

export function LocationScreen({ onConfirm }: LocationScreenProps) {
  const [step, setStep] = useState<'select' | 'form'>('select');
  const [selectedLocation, setSelectedLocation] = useState('Wonokromo');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState<AddressData>({
    name: '',
    phone: '',
    province: 'Jawa Timur',
    city: 'Surabaya',
    district: '',
    postalCode: '',
    street: '',
    detail: '',
  });

  const filteredLocations = specificLocations.filter(loc => 
    loc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setFormData({ ...formData, district: location });
    setStep('form');
  };

  const handleSubmit = () => {
    if (formData.name && formData.phone && formData.district && formData.street) {
      onConfirm(selectedLocation, formData);
    } else {
      alert('Mohon lengkapi semua field yang wajib diisi');
    }
  };

  if (step === 'form') {
    return (
      <div className="min-h-screen bg-[#f0ead2] pb-6">
        <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setStep('select')} className="text-white">
              <X className="w-6 h-6" />
            </button>
            <h1 className="text-white text-xl">Tambah Alamat</h1>
          </div>
        </div>

        <div className="px-6 space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
            <div>
              <label className="text-[#4a5742] text-sm mb-2 block">
                Nama Penerima <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Masukkan nama penerima"
                className="border-[#dde5b6]"
              />
            </div>

            <div>
              <label className="text-[#4a5742] text-sm mb-2 block">
                Nomor Telepon <span className="text-red-500">*</span>
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Contoh: 08123456789"
                className="border-[#dde5b6]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#4a5742] text-sm mb-2 block">Provinsi</label>
                <Input
                  type="text"
                  value={formData.province}
                  disabled
                  className="border-[#dde5b6] bg-gray-50"
                />
              </div>
              <div>
                <label className="text-[#4a5742] text-sm mb-2 block">Kota</label>
                <Input
                  type="text"
                  value={formData.city}
                  disabled
                  className="border-[#dde5b6] bg-gray-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#4a5742] text-sm mb-2 block">
                  Kecamatan <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-2 border border-[#dde5b6] rounded-lg"
                >
                  <option value="">Pilih Kecamatan</option>
                  {specificLocations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[#4a5742] text-sm mb-2 block">Kode Pos</label>
                <Input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="60xxx"
                  className="border-[#dde5b6]"
                />
              </div>
            </div>

            <div>
              <label className="text-[#4a5742] text-sm mb-2 block">
                Nama Jalan, Gedung, No. Rumah <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                placeholder="Contoh: Jl. Ahmad Yani No. 123"
                className="border-[#dde5b6]"
              />
            </div>

            <div>
              <label className="text-[#4a5742] text-sm mb-2 block">
                Detail Lainnya (Cth: Blok/Unit, Patokan)
              </label>
              <textarea
                value={formData.detail}
                onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
                placeholder="Contoh: Blok A No. 5, dekat Indomaret"
                className="w-full px-4 py-2 border border-[#dde5b6] rounded-lg h-24"
              />
            </div>
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full bg-[#adc178] hover:bg-[#9db066] text-white"
          >
            Simpan Alamat
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0ead2] flex flex-col">
      <div className="flex-1 flex flex-col px-6 py-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-[#adc178] rounded-full flex items-center justify-center">
            <MapPin className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl mb-2 text-[#4a5742]">Pilih Lokasi Anda</h1>
          <p className="text-[#6b7463]">
            Pilih kecamatan untuk pengiriman lebih akurat
          </p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7463]" />
          <Input
            type="text"
            placeholder="Cari kecamatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-[#dde5b6]"
          />
        </div>

        <div className="flex-1 space-y-2 mb-6">
          {filteredLocations.map((location) => (
            <button
              key={location}
              onClick={() => handleLocationSelect(location)}
              className="w-full p-4 rounded-lg text-left bg-white text-[#4a5742] hover:bg-[#dde5b6] transition-colors"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#adc178]" />
                <div>
                  <p className="font-medium">{location}</p>
                  <p className="text-sm text-[#6b7463]">Surabaya, Jawa Timur</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
