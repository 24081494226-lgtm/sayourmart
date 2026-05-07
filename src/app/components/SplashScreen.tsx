import image_acac2e17236730e86dc0f9e6383cca6de3d9434d from 'figma:asset/acac2e17236730e86dc0f9e6383cca6de3d9434d.png';
import logoImage from 'figma:asset/dc876fe12f1da0fb4a781be2497566321560d1a7.png';

export function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#adc178] px-6">
      <div className="flex flex-col items-center">
        <img 
          src={image_acac2e17236730e86dc0f9e6383cca6de3d9434d} 
          alt="Sayour Mart" 
          className="w-32 h-32 mb-6 object-contain"
        />
        <h1 className="text-white text-3xl mb-2">Sayour Mart</h1>
        <p className="text-white/90 text-center">
          Belanja Segar Langsung ke Pintu Anda
        </p>
      </div>
      <div className="mt-12">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}