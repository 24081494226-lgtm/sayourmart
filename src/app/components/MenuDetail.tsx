import image_97b9de3c913f629a6984bb5ce03562fa6b1da35f from 'figma:asset/97b9de3c913f629a6984bb5ce03562fa6b1da35f.png';
import image_7608211cd317dbec511cae62eac9be66f81f3edc from 'figma:asset/7608211cd317dbec511cae62eac9be66f81f3edc.png';
import image_01c67b151870856c1a3ae0da3a3287fdc79cb5d6 from 'figma:asset/01c67b151870856c1a3ae0da3a3287fdc79cb5d6.png';
import image_158af8bfb47845e91c5e0b389967c23d1710c66f from 'figma:asset/158af8bfb47845e91c5e0b389967c23d1710c66f.png';
import image_f723a10a7576e7e076e7a3100012f783e66b7b0c from 'figma:asset/f723a10a7576e7e076e7a3100012f783e66b7b0c.png';
import image_51dc584abf3cb20560c366b5376963429a899ef9 from 'figma:asset/51dc584abf3cb20560c366b5376963429a899ef9.png';
import image_d3d1a18f3890aab84a295eff7bbe1c9f9409564b from 'figma:asset/d3d1a18f3890aab84a295eff7bbe1c9f9409564b.png';
import image_6dca1efe68f1eb2fe8434d8caa2ea1099ba536eb from 'figma:asset/6dca1efe68f1eb2fe8434d8caa2ea1099ba536eb.png';
import image_ec3385c6cb101cc7e4d0b6e4d2bb67850250ef1e from 'figma:asset/ec3385c6cb101cc7e4d0b6e4d2bb67850250ef1e.png';
import image_a165bb4f4874b4988e080d0d7c891bae646092ac from 'figma:asset/a165bb4f4874b4988e080d0d7c891bae646092ac.png';
import image_06c7015f8dca06a233e709c4f14d89d53b5fd176 from 'figma:asset/06c7015f8dca06a233e709c4f14d89d53b5fd176.png';
import image_29859fab246ca6fdc4fe45f7ac1b77a098575e9b from 'figma:asset/29859fab246ca6fdc4fe45f7ac1b77a098575e9b.png';
import image_f6b344d2bb2ce954df6c6dad14f8a1bb8e2e442b from 'figma:asset/f6b344d2bb2ce954df6c6dad14f8a1bb8e2e442b.png';
import image_29ecbe8dcef35c1e523e487c270c9e52277db922 from 'figma:asset/29ecbe8dcef35c1e523e487c270c9e52277db922.png';
import image_7c773c2f7da79de8bafdf34c40c86c67f018f8d9 from 'figma:asset/7c773c2f7da79de8bafdf34c40c86c67f018f8d9.png';
import image_6c593a579f259f85a915fae8d751c6e963626504 from 'figma:asset/6c593a579f259f85a915fae8d751c6e963626504.png';
import image_8c04f8eae24eaef95a498ebc957481e4fa26ae3f from 'figma:asset/8c04f8eae24eaef95a498ebc957481e4fa26ae3f.png';
import image_8937f82399b8cfaa09cf64a16025a083fa220631 from 'figma:asset/8937f82399b8cfaa09cf64a16025a083fa220631.png';
import image_b77cb6cbd47949991c6fe75c43f887d268feb4d7 from 'figma:asset/b77cb6cbd47949991c6fe75c43f887d268feb4d7.png';
import image_c11264d4e508e1a7c1c5e0bf10ed78a7dc139800 from 'figma:asset/c11264d4e508e1a7c1c5e0bf10ed78a7dc139800.png';
import image_603797fb557af7c252d4ab417b14b2124fdf0394 from 'figma:asset/603797fb557af7c252d4ab417b14b2124fdf0394.png';
import telurBaladoImage from '../../imports/telur_balado.jpeg';
import ayamSuwirImage from '../../imports/ayam_suwir.jpeg';
import pempekImage from '../../imports/pempek.jpeg';
import taichanImage from '../../imports/taichan.jpeg';
import { ArrowLeft, Clock, Users, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { CartItem } from '../App';

interface MenuDetailProps {
  menuId: string;
  cartCount: number;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
  onNavigateToCart: () => void;
}

const menusData: Record<string, any> = {
  'menu-1': {
    name: 'Nasi goreng',
    image: image_6dca1efe68f1eb2fe8434d8caa2ea1099ba536eb,
    time: '20 menit',
    servings: 2,
    ingredients: [
      { id: 101, name: 'Nasi putih', amount: '2 piring', price: 5000, weight: '400 gr', calories: 260, image: image_f723a10a7576e7e076e7a3100012f783e66b7b0c },
      { id: 8, name: 'Telur ayam', amount: '2 butir', price: 3500, weight: '2 butir', calories: 148, image: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=400' },
      { id: 6, name: 'Daging ayam', amount: '100g', price: 10000, weight: '100 gr', calories: 165, image: image_b77cb6cbd47949991c6fe75c43f887d268feb4d7 },
      { id: 13, name: 'Bawang putih', amount: '3 siung', price: 2000, weight: '15 gr', calories: 22, image: image_603797fb557af7c252d4ab417b14b2124fdf0394 },
      { id: 14, name: 'Bawang merah', amount: '3 siung', price: 2000, weight: '15 gr', calories: 6, image: image_c11264d4e508e1a7c1c5e0bf10ed78a7dc139800 },
      { id: 102, name: 'Kecap manis', amount: '2 sdm', price: 3000, weight: '30 ml', calories: 50, image: image_f723a10a7576e7e076e7a3100012f783e66b7b0c },
      { id: 103, name: 'Minyak goreng', amount: '2 sdm', price: 2000, weight: '30 ml', calories: 240, image: image_f723a10a7576e7e076e7a3100012f783e66b7b0c },
    ],
    steps: [
      'Panaskan minyak, tumis bawang putih dan bawang merah hingga harum',
      'Masukkan ayam cincang, masak hingga matang',
      'Orak-arik telur di wajan yang sama',
      'Masukkan nasi, aduk rata dengan bumbu',
      'Tambahkan kecap manis, aduk hingga merata',
      'Sajikan hangat',
    ]
  },
  'menu-2': {
    name: 'Ayam bakar',
    image: image_ec3385c6cb101cc7e4d0b6e4d2bb67850250ef1e,
    time: '30 menit',
    servings: 2,
    ingredients: [
      { id: 6, name: 'Daging ayam', amount: '500g', price: 20000, weight: '500 gr', calories: 825, image: image_b77cb6cbd47949991c6fe75c43f887d268feb4d7 },
      { id: 104, name: 'Bumbu bakar', amount: '1 pack', price: 8000, weight: '50 gr', calories: 30, image: 'https://images.unsplash.com/photo-1712579733874-c3a79f0f9d12?w=400' },
      { id: 13, name: 'Bawang putih', amount: '5 siung', price: 3000, weight: '25 gr', calories: 37, image: image_603797fb557af7c252d4ab417b14b2124fdf0394 },
      { id: 14, name: 'Bawang merah', amount: '5 siung', price: 3000, weight: '25 gr', calories: 11, image: image_c11264d4e508e1a7c1c5e0bf10ed78a7dc139800 },
      { id: 102, name: 'Kecap manis', amount: '3 sdm', price: 4000, weight: '45 ml', calories: 75, image: image_f723a10a7576e7e076e7a3100012f783e66b7b0c },
    ],
    steps: [
      'Haluskan bawang putih, bawang merah, dan bumbu bakar',
      'Lumuri ayam dengan bumbu halus dan kecap manis',
      'Diamkan 30 menit agar bumbu meresap',
      'Bakar ayam di atas panggangan dengan api sedang',
      'Balik sesekali hingga matang dan kecokelatan',
      'Sajikan dengan sambal dan lalapan',
    ]
  },
  'menu-3': {
    name: 'Rendang',
    image: image_06c7015f8dca06a233e709c4f14d89d53b5fd176,
    time: '45 menit',
    servings: 3,
    ingredients: [
      { id: 5, name: 'Daging sapi', amount: '500g', price: 88000, weight: '500 gr', calories: 1250, image: image_8937f82399b8cfaa09cf64a16025a083fa220631 },
      { id: 105, name: 'Santan', amount: '500ml', price: 8000, weight: '500 ml', calories: 230, image: image_97b9de3c913f629a6984bb5ce03562fa6b1da35f },
      { id: 106, name: 'Bumbu rendang', amount: '1 pack', price: 10000, weight: '100 gr', calories: 50, image: image_97b9de3c913f629a6984bb5ce03562fa6b1da35f },
      { id: 15, name: 'Cabe merah', amount: '5 buah', price: 5000, weight: '50 gr', calories: 159, image: image_01c67b151870856c1a3ae0da3a3287fdc79cb5d6 },
      { id: 14, name: 'Bawang merah', amount: '8 siung', price: 5000, weight: '40 gr', calories: 17, image: image_c11264d4e508e1a7c1c5e0bf10ed78a7dc139800 },
      { id: 13, name: 'Bawang putih', amount: '5 siung', price: 3000, weight: '25 gr', calories: 37, image: image_603797fb557af7c252d4ab417b14b2124fdf0394 },
      { id: 16, name: 'Jahe', amount: '2 cm', price: 2000, weight: '10 gr', calories: 8, image: image_158af8bfb47845e91c5e0b389967c23d1710c66f },
      { id: 107, name: 'Lengkuas', amount: '2 cm', price: 2000, weight: '10 gr', calories: 5, image: image_97b9de3c913f629a6984bb5ce03562fa6b1da35f },
    ],
    steps: [
      'Potong daging sapi sesuai selera',
      'Haluskan bumbu rendang, cabai, bawang merah, bawang putih, jahe',
      'Tumis bumbu halus hingga harum',
      'Masukkan daging, aduk hingga berubah warna',
      'Tuang santan, masak dengan api kecil hingga daging empuk',
      'Masak hingga kuah mengental dan berminyak',
    ]
  },
  'menu-4': {
    name: 'Ayam Suwir',
    image: ayamSuwirImage,
    time: '20 menit',
    servings: 1,
    ingredients: [
      { id: 6, name: 'Daging ayam', amount: '150g', price: 6000, weight: '150 gr', calories: 248, image: image_b77cb6cbd47949991c6fe75c43f887d268feb4d7 },
      { id: 13, name: 'Bawang putih', amount: '2 siung', price: 1000, weight: '10 gr', calories: 15, image: image_603797fb557af7c252d4ab417b14b2124fdf0394 },
      { id: 14, name: 'Bawang merah', amount: '3 siung', price: 2000, weight: '15 gr', calories: 6, image: image_c11264d4e508e1a7c1c5e0bf10ed78a7dc139800 },
      { id: 15, name: 'Cabai merah', amount: '2 buah', price: 2000, weight: '20 gr', calories: 64, image: image_01c67b151870856c1a3ae0da3a3287fdc79cb5d6 },
      { id: 102, name: 'Kecap manis', amount: '1 sdm', price: 1000, weight: '15 ml', calories: 25, image: image_f723a10a7576e7e076e7a3100012f783e66b7b0c },
    ],
    steps: [
      'Rebus ayam hingga matang, suwir-suwir',
      'Haluskan bawang putih, bawang merah, dan cabai merah',
      'Tumis bumbu halus hingga harum',
      'Masukkan ayam suwir, aduk rata',
      'Tambahkan kecap manis, masak hingga meresap',
      'Sajikan hangat',
    ]
  },
  // Indonesian
  'indo-1': {
    name: 'Ayam goreng ketumbar',
    image: 'https://images.unsplash.com/photo-1727404296878-b1c54135cf25?w=600',
    time: '25 menit',
    servings: 2,
    ingredients: [
      { id: 6, name: 'Daging ayam', amount: '400g', price: 16000, weight: '400 gr', calories: 660, image: image_b77cb6cbd47949991c6fe75c43f887d268feb4d7 },
      { id: 112, name: 'Ketumbar', amount: '1 sdm', price: 2000, weight: '10 gr', calories: 3, image: 'https://images.unsplash.com/photo-1727404296878-b1c54135cf25?w=400' },
      { id: 13, name: 'Bawang putih', amount: '4 siung', price: 2000, weight: '20 gr', calories: 30, image: image_603797fb557af7c252d4ab417b14b2124fdf0394 },
      { id: 14, name: 'Bawang merah', amount: '4 siung', price: 3000, weight: '20 gr', calories: 8, image: image_c11264d4e508e1a7c1c5e0bf10ed78a7dc139800 },
      { id: 108, name: 'Kunyit', amount: '2 cm', price: 2000, weight: '10 gr', calories: 4, image: 'https://images.unsplash.com/photo-1727404296878-b1c54135cf25?w=400' },
      { id: 113, name: 'Garam', amount: '1 sdt', price: 500, weight: '5 gr', calories: 0, image: 'https://images.unsplash.com/photo-1727404296878-b1c54135cf25?w=400' },
      { id: 103, name: 'Minyak goreng', amount: '100 ml', price: 5000, weight: '100 ml', calories: 800, image: 'https://images.unsplash.com/photo-1727404296878-b1c54135cf25?w=400' },
    ],
    steps: [
      'Haluskan ketumbar, bawang putih, bawang merah, kunyit, dan garam',
      'Lumuri ayam dengan bumbu halus, diamkan 30 menit',
      'Panaskan minyak dalam wajan',
      'Goreng ayam hingga kuning kecokelatan',
      'Tiriskan dan sajikan hangat',
    ]
  },
  'indo-2': {
    name: 'Telur Balado',
    image: telurBaladoImage,
    time: '15 menit',
    servings: 1,
    ingredients: [
      { id: 8, name: 'Telur rebus', amount: '3 butir', price: 4000, weight: '3 butir', calories: 222, image: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=400' },
      { id: 15, name: 'Cabai merah', amount: '5 buah', price: 5000, weight: '50 gr', calories: 159, image: image_01c67b151870856c1a3ae0da3a3287fdc79cb5d6 },
      { id: 14, name: 'Bawang merah', amount: '5 siung', price: 3000, weight: '25 gr', calories: 11, image: image_c11264d4e508e1a7c1c5e0bf10ed78a7dc139800 },
      { id: 13, name: 'Bawang putih', amount: '3 siung', price: 2000, weight: '15 gr', calories: 22, image: image_603797fb557af7c252d4ab417b14b2124fdf0394 },
      { id: 4, name: 'Tomat', amount: '2 buah', price: 3000, weight: '100 gr', calories: 18, image: 'https://images.unsplash.com/photo-1570543375343-63fe3d67761b?w=400' },
      { id: 113, name: 'Garam', amount: '1/2 sdt', price: 500, weight: '3 gr', calories: 0, image: 'https://images.unsplash.com/photo-1642704608419-fe7ee1ddc7fd?w=400' },
    ],
    steps: [
      'Rebus telur hingga matang, kupas kulitnya',
      'Haluskan cabai merah, bawang merah, bawang putih, dan tomat',
      'Tumis bumbu halus hingga harum',
      'Tambahkan garam dan sedikit gula',
      'Masukkan telur rebus, aduk hingga bumbu merata',
      'Sajikan hangat',
    ]
  },
  'indo-3': {
    name: 'Sate Taichan',
    image: taichanImage,
    time: '20 menit',
    servings: 2,
    ingredients: [
      { id: 6, name: 'Daging ayam', amount: '300g', price: 12000, weight: '300 gr', calories: 495, image: image_b77cb6cbd47949991c6fe75c43f887d268feb4d7 },
      { id: 13, name: 'Bawang putih', amount: '5 siung', price: 3000, weight: '25 gr', calories: 37, image: image_603797fb557af7c252d4ab417b14b2124fdf0394 },
      { id: 134, name: 'Cabai rawit', amount: '10 buah', price: 3000, weight: '30 gr', calories: 12, image: 'https://images.unsplash.com/photo-1645696301019-35adcc18fc21?w=400' },
      { id: 135, name: 'Jeruk nipis', amount: '2 buah', price: 2000, weight: '50 gr', calories: 10, image: 'https://images.unsplash.com/photo-1645696301019-35adcc18fc21?w=400' },
      { id: 136, name: 'Kecap asin', amount: '1 sdm', price: 1000, weight: '15 ml', calories: 5, image: 'https://images.unsplash.com/photo-1645696301019-35adcc18fc21?w=400' },
      { id: 113, name: 'Garam', amount: '1 sdt', price: 500, weight: '5 gr', calories: 0, image: 'https://images.unsplash.com/photo-1645696301019-35adcc18fc21?w=400' },
    ],
    steps: [
      'Potong daging ayam dadu, tusuk dengan tusuk sate',
      'Haluskan bawang putih dan garam, lumuri ayam',
      'Bakar sate hingga matang',
      'Haluskan cabai rawit, jeruk nipis, dan kecap asin untuk sambal',
      'Siram sate dengan sambal',
      'Sajikan hangat',
    ]
  },
  'indo-4': {
    name: 'Pempek',
    image: pempekImage,
    time: '25 menit',
    servings: 2,
    ingredients: [
      { id: 137, name: 'Ikan tenggiri', amount: '250g', price: 15000, weight: '250 gr', calories: 275, image: 'https://images.unsplash.com/photo-1707531288747-ad6d172864a4?w=400' },
      { id: 138, name: 'Tepung sagu', amount: '150g', price: 5000, weight: '150 gr', calories: 540, image: 'https://images.unsplash.com/photo-1707531288747-ad6d172864a4?w=400' },
      { id: 8, name: 'Telur', amount: '2 butir', price: 3500, weight: '2 butir', calories: 148, image: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=400' },
      { id: 13, name: 'Bawang putih', amount: '3 siung', price: 2000, weight: '15 gr', calories: 22, image: image_603797fb557af7c252d4ab417b14b2124fdf0394 },
      { id: 113, name: 'Garam', amount: '1 sdt', price: 500, weight: '5 gr', calories: 0, image: 'https://images.unsplash.com/photo-1707531288747-ad6d172864a4?w=400' },
      { id: 139, name: 'Cuka', amount: '100ml', price: 3000, weight: '100 ml', calories: 18, image: 'https://images.unsplash.com/photo-1707531288747-ad6d172864a4?w=400' },
      { id: 15, name: 'Cabai', amount: '5 buah', price: 2000, weight: '50 gr', calories: 159, image: image_01c67b151870856c1a3ae0da3a3287fdc79cb5d6 },
    ],
    steps: [
      'Haluskan ikan tenggiri, campur dengan tepung sagu',
      'Tambahkan bawang putih halus, garam, dan telur',
      'Bentuk adonan sesuai selera',
      'Rebus pempek hingga mengapung',
      'Buat kuah cuko dari cuka, cabai, dan gula',
      'Sajikan pempek dengan kuah cuko',
    ]
  },
  // Western
  'west-1': {
    name: 'Fish and chips',
    image: 'https://images.unsplash.com/photo-1719459341702-fc1c814d8dce?w=600',
    time: '25 menit',
    servings: 2,
    ingredients: [
      { id: 120, name: 'Ikan dori', amount: '300g', price: 35000, weight: '300 gr', calories: 270, image: image_6c593a579f259f85a915fae8d751c6e963626504 },
      { id: 111, name: 'Kentang', amount: '300g', price: 6000, weight: '300 gr', calories: 231, image: image_6c593a579f259f85a915fae8d751c6e963626504 },
      { id: 121, name: 'Tepung roti', amount: '100g', price: 5000, weight: '100 gr', calories: 395, image: image_6c593a579f259f85a915fae8d751c6e963626504 },
      { id: 8, name: 'Telur', amount: '1 butir', price: 1750, weight: '1 butir', calories: 74, image: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=400' },
      { id: 103, name: 'Minyak goreng', amount: '200ml', price: 8000, weight: '200 ml', calories: 1600, image: image_6c593a579f259f85a915fae8d751c6e963626504 },
      { id: 113, name: 'Garam', amount: '1 sdt', price: 500, weight: '5 gr', calories: 0, image: image_6c593a579f259f85a915fae8d751c6e963626504 },
      { id: 122, name: 'Lemon', amount: '1 buah', price: 3000, weight: '50 gr', calories: 15, image: image_6c593a579f259f85a915fae8d751c6e963626504 },
    ],
    steps: [
      'Potong kentang memanjang, goreng hingga kecokelatan',
      'Lumuri ikan dengan garam',
      'Celup ikan ke telur, lalu tepung roti',
      'Goreng ikan hingga golden brown',
      'Sajikan dengan lemon dan saus tartar',
    ]
  },
  'west-2': {
    name: 'Salad',
    image: 'https://images.unsplash.com/photo-1677653805080-59c57727c84e?w=600',
    time: '10 menit',
    servings: 1,
    ingredients: [
      { id: 123, name: 'Selada', amount: '100g', price: 5000, weight: '100 gr', calories: 15, image: 'https://images.unsplash.com/photo-1677653805080-59c57727c84e?w=400' },
      { id: 4, name: 'Tomat cherry', amount: '50g', price: 4000, weight: '50 gr', calories: 9, image: 'https://images.unsplash.com/photo-1570543375343-63fe3d67761b?w=400' },
      { id: 124, name: 'Timun', amount: '50g', price: 2000, weight: '50 gr', calories: 8, image: 'https://images.unsplash.com/photo-1677653805080-59c57727c84e?w=400' },
      { id: 3, name: 'Wortel', amount: '1 buah', price: 4500, weight: '100 gr', calories: 41, image: image_29ecbe8dcef35c1e523e487c270c9e52277db922 },
      { id: 125, name: 'Dressing salad', amount: '2 sdm', price: 4000, weight: '30 ml', calories: 60, image: 'https://images.unsplash.com/photo-1677653805080-59c57727c84e?w=400' },
      { id: 27, name: 'Keju parmesan', amount: '20g', price: 9000, weight: '20 gr', calories: 86, image: 'https://images.unsplash.com/photo-1677653805080-59c57727c84e?w=400' },
    ],
    steps: [
      'Cuci bersih semua sayuran',
      'Potong selada, tomat, timun, dan wortel',
      'Campur semua sayuran dalam mangkuk',
      'Siram dengan dressing salad',
      'Taburkan keju parmesan',
      'Sajikan segera',
    ]
  },
  'west-3': {
    name: 'Spaghetti',
    image: 'https://images.unsplash.com/photo-1548247661-3d7905940716?w=600',
    time: '20 menit',
    servings: 2,
    ingredients: [
      { id: 126, name: 'Pasta spaghetti', amount: '200g', price: 12000, weight: '200 gr', calories: 310, image: 'https://images.unsplash.com/photo-1548247661-3d7905940716?w=400' },
      { id: 127, name: 'Saus tomat', amount: '150ml', price: 8000, weight: '150 ml', calories: 45, image: 'https://images.unsplash.com/photo-1548247661-3d7905940716?w=400' },
      { id: 128, name: 'Daging cincang', amount: '150g', price: 15000, weight: '150 gr', calories: 375, image: 'https://images.unsplash.com/photo-1548247661-3d7905940716?w=400' },
      { id: 13, name: 'Bawang putih', amount: '3 siung', price: 2000, weight: '15 gr', calories: 22, image: image_603797fb557af7c252d4ab417b14b2124fdf0394 },
      { id: 129, name: 'Bawang bombay', amount: '1 buah', price: 3000, weight: '100 gr', calories: 40, image: 'https://images.unsplash.com/photo-1548247661-3d7905940716?w=400' },
      { id: 27, name: 'Keju parmesan', amount: '30g', price: 13500, weight: '30 gr', calories: 129, image: 'https://images.unsplash.com/photo-1548247661-3d7905940716?w=400' },
      { id: 130, name: 'Oregano', amount: '1 sdt', price: 2000, weight: '5 gr', calories: 3, image: 'https://images.unsplash.com/photo-1548247661-3d7905940716?w=400' },
    ],
    steps: [
      'Rebus spaghetti hingga al dente',
      'Tumis bawang putih dan bawang bombay hingga harum',
      'Masukkan daging cincang, masak hingga matang',
      'Tambahkan saus tomat dan oregano',
      'Campur spaghetti dengan saus',
      'Taburkan keju parmesan, sajikan',
    ]
  },
  'west-4': {
    name: 'Steak',
    image: 'https://images.unsplash.com/photo-1677027201352-3c3981cb8b5c?w=600',
    time: '30 menit',
    servings: 2,
    ingredients: [
      { id: 5, name: 'Daging sapi', amount: '400g', price: 70400, weight: '400 gr', calories: 1000, image: image_8937f82399b8cfaa09cf64a16025a083fa220631 },
      { id: 111, name: 'Kentang', amount: '200g', price: 4000, weight: '200 gr', calories: 154, image: image_29859fab246ca6fdc4fe45f7ac1b77a098575e9b },
      { id: 131, name: 'Brokoli', amount: '100g', price: 5000, weight: '100 gr', calories: 34, image: image_29859fab246ca6fdc4fe45f7ac1b77a098575e9b },
      { id: 3, name: 'Wortel', amount: '1 buah', price: 4500, weight: '100 gr', calories: 41, image: image_29ecbe8dcef35c1e523e487c270c9e52277db922 },
      { id: 13, name: 'Bawang putih', amount: '4 siung', price: 2000, weight: '20 gr', calories: 30, image: image_603797fb557af7c252d4ab417b14b2124fdf0394 },
      { id: 132, name: 'Mentega', amount: '50g', price: 8000, weight: '50 gr', calories: 359, image: image_29859fab246ca6fdc4fe45f7ac1b77a098575e9b },
      { id: 133, name: 'Black pepper', amount: '1 sdt', price: 2000, weight: '5 gr', calories: 6, image: image_29859fab246ca6fdc4fe45f7ac1b77a098575e9b },
    ],
    steps: [
      'Bumbui daging dengan garam dan black pepper',
      'Panaskan mentega di pan',
      'Masak daging sesuai tingkat kematangan yang diinginkan',
      'Tumis bawang putih hingga harum, siram ke steak',
      'Rebus kentang, brokoli, dan wortel',
      'Sajikan steak dengan sayuran',
    ]
  },
};

export function MenuDetail({ menuId, cartCount, onBack, onAddToCart, onNavigateToCart }: MenuDetailProps) {
  const menu = menusData[menuId] || menusData['menu-1'];

  return (
    <div className="min-h-screen bg-[#f0ead2] pb-20">
      {/* Header */}
      <div className="bg-[#adc178] px-6 py-4 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-white text-xl">Detail Menu</h1>
          </div>
          <button 
            onClick={onNavigateToCart}
            className="bg-white/20 p-2 rounded-full relative"
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Menu Info */}
        <div className="bg-white rounded-xl overflow-hidden shadow-md">
          <div className="h-48 overflow-hidden">
            <img src={menu.image} alt={menu.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-6">
            <h2 className="text-[#4a5742] text-xl mb-3">{menu.name}</h2>
            <div className="flex gap-6 text-[#6b7463] text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{menu.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{menu.servings} porsi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-[#4a5742] mb-4">Bahan-Bahan ({menu.ingredients.length} item)</h3>
          <div className="space-y-3">
            {menu.ingredients.map((ingredient: any) => (
              <div key={ingredient.id} className="flex items-center justify-between py-2 border-b border-[#dde5b6] last:border-0">
                <div>
                  <p className="text-[#4a5742]">{ingredient.name}</p>
                  <p className="text-[#6b7463] text-sm">{ingredient.amount}</p>
                </div>
                <p className="text-[#adc178]">
                  Rp {ingredient.price.toLocaleString('id-ID')}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#dde5b6]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#4a5742]">Total:</span>
              <span className="text-[#adc178]">
                Rp {menu.ingredients.reduce((sum: number, item: any) => sum + item.price, 0).toLocaleString('id-ID')}
              </span>
            </div>
            <Button 
              onClick={() => {
                menu.ingredients.forEach((ingredient: any) => {
                  onAddToCart({ 
                    id: ingredient.id, 
                    name: ingredient.name, 
                    price: ingredient.price, 
                    quantity: 1,
                    image: ingredient.image,
                    weight: ingredient.weight,
                    calories: ingredient.calories
                  });
                });
              }}
              className="w-full bg-[#adc178] hover:bg-[#9db066] text-white"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Tambah Semua ke Keranjang
            </Button>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-[#4a5742] mb-4">Langkah-Langkah</h3>
          <div className="space-y-3">
            {menu.steps.map((step: string, index: number) => (
              <div key={index} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#adc178] text-white flex items-center justify-center flex-shrink-0 text-sm">
                  {index + 1}
                </div>
                <p className="text-[#4a5742] flex-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
