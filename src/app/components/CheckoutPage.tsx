import { ArrowLeft, MapPin, CreditCard, Wallet, Truck, ChevronRight, Tag, Coins as CoinsIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CartItem } from '../App';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onBack: () => void;
  onConfirm: (coinsUsed: number) => void;
  user?: any;
  memberPoints?: number;
}

const shippingOptions = [
  { id: 'gosend', name: 'Gosend Instant', price: 15000, time: '30-45 menit' },
  { id: 'grab', name: 'Grab Express Instant', price: 12000, time: '45-60 menit' },
  { id: 'spx', name: 'SPX Instant', price: 10000, time: '1-2 jam' },
  { id: 'kurir', name: 'Kurir Instan Sayour', price: 8000, time: '1-2 jam' },
];

const vouchers = [
  { id: 'DISC20', name: 'Diskon 20%', discount: 0.2, min: 50000, type: 'percentage' },
  { id: 'DISC10', name: 'Diskon 10%', discount: 0.1, min: 20000, type: 'percentage' },
  { id: 'ONGKIR5', name: 'Potongan Ongkir Rp 5.000', discount: 5000, type: 'shipping' },
  { id: 'FREEONGKIR', name: 'Gratis Ongkir', discount: 0, type: 'free_shipping' },
];

export function CheckoutPage({ cartItems, onBack, onConfirm, user, memberPoints = 0 }: CheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ewallet' | 'cod'>('ewallet');
  const [showAddressEdit, setShowAddressEdit] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState('gosend');
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
  const [selectedVoucher2, setSelectedVoucher2] = useState<string | null>(null);
  const [coinsUsed, setCoinsUsed] = useState(0);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  
  const [addressData, setAddressData] = useState({
    name: user?.fullAddress?.name || user?.name || '',
    phone: user?.fullAddress?.phone || user?.phone || '',
    province: 'Jawa Timur',
    city: 'Surabaya',
    district: user?.fullAddress?.district || user?.location || 'Wonokromo',
    postalCode: user?.fullAddress?.postalCode || '60243',
    street: user?.fullAddress?.street || 'Jl. Raya Darmo No. 123',
    detail: user?.fullAddress?.detail || '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = shippingOptions.find(s => s.id === selectedShipping)?.price || 0;
  
  // Function to check if voucher combination is valid
  const isValidVoucherCombination = (v1Id: string | null, v2Id: string | null): boolean => {
    if (!v1Id || !v2Id) return true;
    
    const v1 = vouchers.find(v => v.id === v1Id);
    const v2 = vouchers.find(v => v.id === v2Id);
    
    if (!v1 || !v2) return true;
    
    // Diskon % + Gratis Ongkir = boleh
    if ((v1.type === 'percentage' && (v2.type === 'shipping' || v2.type === 'free_shipping')) ||
        ((v1.type === 'shipping' || v1.type === 'free_shipping') && v2.type === 'percentage')) {
      return true;
    }
    
    // Diskon % + Diskon % = tidak boleh
    if (v1.type === 'percentage' && v2.type === 'percentage') {
      return false;
    }
    
    // Gratis Ongkir + Gratis Ongkir = tidak boleh
    if ((v1.type === 'shipping' || v1.type === 'free_shipping') && 
        (v2.type === 'shipping' || v2.type === 'free_shipping')) {
      return false;
    }
    
    return true;
  };
  
  // Calculate voucher discount
  let voucherDiscount = 0;
  let shippingDiscount = 0;
  
  // Calculate first voucher
  if (selectedVoucher) {
    const voucher = vouchers.find(v => v.id === selectedVoucher);
    if (voucher) {
      if (voucher.type === 'shipping') {
        shippingDiscount += Math.min(voucher.discount as number, shipping);
      } else if (voucher.type === 'free_shipping') {
        shippingDiscount += shipping;
      } else if (voucher.type === 'percentage' && subtotal >= voucher.min) {
        voucherDiscount += subtotal * (voucher.discount as number);
      }
    }
  }
  
  // Calculate second voucher
  if (selectedVoucher2 && isValidVoucherCombination(selectedVoucher, selectedVoucher2)) {
    const voucher = vouchers.find(v => v.id === selectedVoucher2);
    if (voucher) {
      if (voucher.type === 'shipping') {
        shippingDiscount += Math.min(voucher.discount as number, Math.max(0, shipping - shippingDiscount));
      } else if (voucher.type === 'free_shipping') {
        shippingDiscount = shipping; // Full free shipping
      } else if (voucher.type === 'percentage' && subtotal >= voucher.min) {
        voucherDiscount += subtotal * (voucher.discount as number);
      }
    }
  }
  
  // Cap shipping discount to actual shipping cost
  shippingDiscount = Math.min(shippingDiscount, shipping);
  
  // Calculate coins discount (1 coin = Rp 100)
  const maxCoins = Math.min(memberPoints, Math.floor(subtotal / 100));
  const coinsDiscount = coinsUsed * 100;
  
  const total = subtotal + shipping - voucherDiscount - shippingDiscount - coinsDiscount;
  const totalCalories = cartItems.reduce((sum, item) => sum + (item.calories * item.quantity), 0);

  if (showAddressEdit) {
    return (
      <div className="min-h-screen bg-[#f0ead2] pb-20">
        <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
          <div className="flex items-center gap-4">
            <button onClick={() => setShowAddressEdit(false)} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-white text-xl">Edit Alamat</h1>
          </div>
        </div>

        <div className="px-6 py-6 space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
            <div>
              <label className="text-[#4a5742] text-sm mb-2 block">Nama Penerima</label>
              <Input
                value={addressData.name}
                onChange={(e) => setAddressData({ ...addressData, name: e.target.value })}
                className="border-[#dde5b6]"
              />
            </div>
            <div>
              <label className="text-[#4a5742] text-sm mb-2 block">Nomor Telepon</label>
              <Input
                value={addressData.phone}
                onChange={(e) => setAddressData({ ...addressData, phone: e.target.value })}
                className="border-[#dde5b6]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#4a5742] text-sm mb-2 block">Kecamatan</label>
                <Input
                  value={addressData.district}
                  onChange={(e) => setAddressData({ ...addressData, district: e.target.value })}
                  className="border-[#dde5b6]"
                />
              </div>
              <div>
                <label className="text-[#4a5742] text-sm mb-2 block">Kode Pos</label>
                <Input
                  value={addressData.postalCode}
                  onChange={(e) => setAddressData({ ...addressData, postalCode: e.target.value })}
                  className="border-[#dde5b6]"
                />
              </div>
            </div>
            <div>
              <label className="text-[#4a5742] text-sm mb-2 block">Alamat Lengkap</label>
              <Input
                value={addressData.street}
                onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                className="border-[#dde5b6]"
              />
            </div>
            <div>
              <label className="text-[#4a5742] text-sm mb-2 block">Detail (Opsional)</label>
              <textarea
                value={addressData.detail}
                onChange={(e) => setAddressData({ ...addressData, detail: e.target.value })}
                className="w-full px-4 py-2 border border-[#dde5b6] rounded-lg h-24"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={() => setShowAddressEdit(false)}
              className="flex-1 bg-white text-[#adc178] border-2 border-[#adc178] hover:bg-[#f0ead2]"
            >
              Hapus Alamat
            </Button>
            <Button 
              onClick={() => setShowAddressEdit(false)}
              className="flex-1 bg-[#adc178] hover:bg-[#9db066] text-white"
            >
              Simpan
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0ead2] pb-20">
      {/* Header */}
      <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-xl">Pembayaran</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Delivery Address */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#adc178]" />
              <h3 className="text-[#4a5742]">Alamat Pengiriman</h3>
            </div>
            <button 
              onClick={() => setShowAddressEdit(true)}
              className="text-[#adc178] text-sm"
            >
              Ubah
            </button>
          </div>
          <p className="text-[#4a5742] mb-1">{addressData.name} | {addressData.phone}</p>
          <p className="text-[#6b7463] text-sm">
            {addressData.street}<br />
            {addressData.district}, {addressData.city}, {addressData.province} {addressData.postalCode}
            {addressData.detail && <><br />{addressData.detail}</>}
          </p>
        </div>

        {/* Shipping Options */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="w-5 h-5 text-[#adc178]" />
            <h3 className="text-[#4a5742]">Opsi Pengiriman</h3>
          </div>
          <div className="space-y-3">
            {shippingOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedShipping(option.id)}
                className={`w-full p-4 rounded-lg border-2 text-left ${
                  selectedShipping === option.id
                    ? 'border-[#adc178] bg-[#f0ead2]'
                    : 'border-[#dde5b6]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#4a5742]">{option.name}</p>
                    <p className="text-[#6b7463] text-sm">{option.time}</p>
                  </div>
                  <p className="text-[#adc178]">
                    Rp {option.price.toLocaleString('id-ID')}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Voucher */}
        <button
          onClick={() => setShowVoucherModal(!showVoucherModal)}
          className="w-full bg-white rounded-xl p-6 shadow-md flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Tag className="w-5 h-5 text-[#adc178]" />
            <div className="text-left">
              <h3 className="text-[#4a5742]">Voucher</h3>
              {selectedVoucher || selectedVoucher2 ? (
                <div className="text-[#adc178] text-sm">
                  {selectedVoucher && <p>{vouchers.find(v => v.id === selectedVoucher)?.name}</p>}
                  {selectedVoucher2 && <p>{vouchers.find(v => v.id === selectedVoucher2)?.name}</p>}
                </div>
              ) : (
                <p className="text-[#6b7463] text-sm">Pilih voucher (maksimal 2)</p>
              )}
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#6b7463]" />
        </button>

        {showVoucherModal && (
          <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
            <h4 className="text-[#4a5742]">Pilih Voucher (Maksimal 2)</h4>
            
            {/* Selected Vouchers Display */}
            {(selectedVoucher || selectedVoucher2) && (
              <div className="bg-[#f0ead2] p-4 rounded-lg space-y-2">
                <p className="text-[#4a5742] text-sm">Voucher Terpilih:</p>
                {selectedVoucher && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#6b7463] text-sm">{vouchers.find(v => v.id === selectedVoucher)?.name}</span>
                    <button 
                      onClick={() => setSelectedVoucher(null)}
                      className="text-red-500 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                )}
                {selectedVoucher2 && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#6b7463] text-sm">{vouchers.find(v => v.id === selectedVoucher2)?.name}</span>
                    <button 
                      onClick={() => setSelectedVoucher2(null)}
                      className="text-red-500 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Voucher List */}
            <div className="space-y-3">
              {vouchers.map((voucher) => {
                const isEligible = voucher.type === 'shipping' || voucher.type === 'free_shipping' || subtotal >= voucher.min;
                const isAlreadySelected = selectedVoucher === voucher.id || selectedVoucher2 === voucher.id;
                
                // Check if selecting this voucher would be valid
                let canSelect = !isAlreadySelected;
                if (selectedVoucher && !selectedVoucher2) {
                  canSelect = canSelect && isValidVoucherCombination(selectedVoucher, voucher.id);
                } else if (selectedVoucher2 && !selectedVoucher) {
                  canSelect = canSelect && isValidVoucherCombination(selectedVoucher2, voucher.id);
                } else if (!selectedVoucher && !selectedVoucher2) {
                  canSelect = true;
                }
                
                const canSelectVoucher = isEligible && canSelect && (!selectedVoucher || !selectedVoucher2);
                
                return (
                  <button
                    key={voucher.id}
                    onClick={() => {
                      if (canSelectVoucher && !isAlreadySelected) {
                        if (!selectedVoucher) {
                          setSelectedVoucher(voucher.id);
                        } else if (!selectedVoucher2) {
                          setSelectedVoucher2(voucher.id);
                        }
                      }
                    }}
                    disabled={!canSelectVoucher && !isAlreadySelected}
                    className={`w-full p-4 rounded-lg border text-left transition-all ${
                      isAlreadySelected
                        ? 'border-[#adc178] bg-[#dde5b6]' 
                        : canSelectVoucher
                        ? 'border-[#adc178] hover:bg-[#f0ead2]' 
                        : 'border-gray-300 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <p className="text-[#4a5742]">{voucher.name}</p>
                    {voucher.type !== 'shipping' && voucher.type !== 'free_shipping' && (
                      <p className="text-[#6b7463] text-sm">
                        Min. belanja Rp {voucher.min.toLocaleString('id-ID')}
                      </p>
                    )}
                    {!isEligible && (
                      <p className="text-red-500 text-xs mt-1">Minimum belanja belum terpenuhi</p>
                    )}
                    {!canSelect && !isAlreadySelected && (
                      <p className="text-red-500 text-xs mt-1">Tidak bisa dikombinasikan</p>
                    )}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setShowVoucherModal(false)}
              className="w-full bg-[#adc178] text-white py-3 rounded-lg hover:bg-[#9db066]"
            >
              Tutup
            </button>
          </div>
        )}
        
        {/* Coins */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <CoinsIcon className="w-5 h-5 text-[#adc178]" />
            <h3 className="text-[#4a5742]">Tukar Coins</h3>
          </div>
          <p className="text-[#6b7463] text-sm mb-3">
            Kamu punya {memberPoints} coins (1 coin = Rp 100)
          </p>
          <div className="flex items-center gap-3">
            <Input
              type="number"
              min={0}
              max={maxCoins}
              value={coinsUsed}
              onChange={(e) => setCoinsUsed(Math.min(maxCoins, Math.max(0, parseInt(e.target.value) || 0)))}
              placeholder="Jumlah coins"
              className="border-[#dde5b6]"
            />
            <Button
              onClick={() => setCoinsUsed(maxCoins)}
              className="bg-[#adc178] hover:bg-[#9db066] text-white whitespace-nowrap"
            >
              Pakai Semua
            </Button>
          </div>
          {coinsUsed > 0 && (
            <p className="text-[#adc178] text-sm mt-2">
              Hemat Rp {coinsDiscount.toLocaleString('id-ID')}
            </p>
          )}
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-[#4a5742] mb-4">Metode Pembayaran</h3>
          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod('ewallet')}
              className={`w-full p-4 rounded-lg border-2 flex items-center gap-3 ${
                paymentMethod === 'ewallet'
                  ? 'border-[#adc178] bg-[#f0ead2]'
                  : 'border-[#dde5b6]'
              }`}
            >
              <Wallet className="w-5 h-5 text-[#adc178]" />
              <span className="text-[#4a5742]">E-Wallet (GoPay, OVO, DANA)</span>
            </button>
            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full p-4 rounded-lg border-2 flex items-center gap-3 ${
                paymentMethod === 'card'
                  ? 'border-[#adc178] bg-[#f0ead2]'
                  : 'border-[#dde5b6]'
              }`}
            >
              <CreditCard className="w-5 h-5 text-[#adc178]" />
              <span className="text-[#4a5742]">Kartu Kredit/Debit</span>
            </button>
            <button
              onClick={() => setPaymentMethod('cod')}
              className={`w-full p-4 rounded-lg border-2 flex items-center gap-3 ${
                paymentMethod === 'cod'
                  ? 'border-[#adc178] bg-[#f0ead2]'
                  : 'border-[#dde5b6]'
              }`}
            >
              <Wallet className="w-5 h-5 text-[#adc178]" />
              <span className="text-[#4a5742]">COD (Bayar di Tempat)</span>
            </button>
          </div>
        </div>

        {/* Card Details (if card is selected) */}
        {paymentMethod === 'card' && (
          <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
            <Input placeholder="Nomor Kartu" className="bg-[#f0ead2] border-[#dde5b6]" />
            <Input placeholder="Nama Pemegang Kartu" className="bg-[#f0ead2] border-[#dde5b6]" />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="MM/YY" className="bg-[#f0ead2] border-[#dde5b6]" />
              <Input placeholder="CVV" className="bg-[#f0ead2] border-[#dde5b6]" />
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-6 shadow-md space-y-3">
          <h3 className="text-[#4a5742] mb-4">Ringkasan Pesanan</h3>
          <div className="flex justify-between text-[#6b7463]">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-[#6b7463]">
            <span>Biaya Pengiriman</span>
            <span>Rp {shipping.toLocaleString('id-ID')}</span>
          </div>
          {voucherDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Diskon Voucher</span>
              <span>- Rp {voucherDiscount.toLocaleString('id-ID')}</span>
            </div>
          )}
          {shippingDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Diskon Ongkir</span>
              <span>- Rp {shippingDiscount.toLocaleString('id-ID')}</span>
            </div>
          )}
          {coinsDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Diskon Coins ({coinsUsed} coins)</span>
              <span>- Rp {coinsDiscount.toLocaleString('id-ID')}</span>
            </div>
          )}
          <div className="border-t border-[#dde5b6] pt-3 flex justify-between text-[#4a5742]">
            <span>Total</span>
            <span>Rp {total.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-[#6b7463]">
            <span>Total Kalori</span>
            <span>{totalCalories} kalori</span>
          </div>
        </div>

        <Button 
          onClick={() => onConfirm(coinsUsed)}
          className="w-full bg-[#adc178] hover:bg-[#9db066] text-white"
        >
          Bayar Sekarang
        </Button>
      </div>
    </div>
  );
}