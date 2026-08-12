import { motion } from 'framer-motion';
import { games } from '@/data/Games';
import { HoloPrism } from '@/components/ui/holoprism';

import logoLedes from '@/assets/logo_ledesgames.png'; 

const HeroSection = () => {
  const gameImages = games.map(g => g.image).filter(Boolean);
  
  const fallbackImages = [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=600&q=80"
  ];

  const allImages = [...gameImages, ...fallbackImages];

  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-transparent">
      
      
      {/* --- CUBOS DE FUNDO --- */}
      
      <div className="absolute top-[20%] left-[28%] z-0 hidden lg:block">
        <HoloPrism size={90} tiltX={35} tiltZ={-15} initialAngleY={15} opacity={0.35} floatDuration={5.2} floatDelay={0.2} floatOffset={8} />
      </div>
      <div className="absolute top-[18%] right-[25%] z-0 hidden lg:block">
        <HoloPrism size={100} tiltX={-40} tiltZ={20} initialAngleY={110} opacity={0.3} floatDuration={6.0} floatDelay={1.5} floatOffset={10} />
      </div>
      <div className="absolute bottom-[18%] left-[22%] z-0 hidden md:block">
        <HoloPrism size={110} tiltX={-20} tiltZ={10} initialAngleY={70} opacity={0.4} floatDuration={4.8} floatDelay={0.8} floatOffset={12} />
      </div>
      <div className="absolute bottom-[22%] right-[20%] z-0 hidden md:block">
        <HoloPrism size={85} tiltX={30} tiltZ={-12} initialAngleY={210} opacity={0.35} floatDuration={5.5} floatDelay={2.1} floatOffset={9} />
      </div>

      {/* --- LOGO NO CENTRO --- */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8 }}
          className="relative flex justify-center items-center pointer-events-auto"
        >
          <div className="absolute inset-0 bg-[#29FFC6]/20 blur-3xl rounded-full scale-90 pointer-events-none" />
          
          <img 
            src={logoLedes} 
            alt="LEDES Games Logo" 
            className="w-48 md:w-64 lg:w-80 h-auto object-contain drop-shadow-[0_0_30px_rgba(41,255,198,0.45)] z-10 select-none"
          />
        </motion.div>
      </div>

      {/* --- CUBOS PRINCIPAIS COM FOTOS --- */}

      {/* --- LADO ESQUERDO --- */}
      <div className="absolute top-[10%] left-[4%] z-10 hidden lg:block">
        <HoloPrism image={allImages[0]} size={180} tiltX={-38} tiltZ={-10} initialAngleY={55} floatDuration={4.2} floatDelay={0.3} floatOffset={14} />
      </div>
      <div className="absolute top-[32%] left-[20%] z-10 hidden md:block">
        <HoloPrism image={allImages[1]} size={230} tiltX={22} tiltZ={8} initialAngleY={-40} floatDuration={5.0} floatDelay={1.2} floatOffset={16} />
      </div>
      <div className="absolute bottom-[12%] left-[8%] z-10 hidden xl:block">
        <HoloPrism image={allImages[2]} size={185} tiltX={-32} tiltZ={-12} initialAngleY={45} floatDuration={4.6} floatDelay={2.4} floatOffset={11} />
      </div>

      {/* --- LADO DIREITO --- */}
      <div className="absolute top-[10%] right-[7%] z-10 hidden xl:block">
        <HoloPrism image={allImages[3]} size={165} tiltX={-26} tiltZ={12} initialAngleY={-35} floatDuration={4.8} floatDelay={1.8} floatOffset={13} />
      </div>
      <div className="absolute top-[40%] right-[15%] z-10 hidden md:block">
        <HoloPrism image={allImages[4]} size={230} tiltX={20} tiltZ={-8} initialAngleY={40} floatDuration={5.4} floatDelay={0.6} floatOffset={15} />
      </div>
      <div className="absolute bottom-[10%] right-[5%] z-10 hidden lg:block">
        <HoloPrism image={allImages[5]} size={185} tiltX={-30} tiltZ={10} initialAngleY={-45} floatDuration={4.3} floatDelay={2.0} floatOffset={12} />
      </div>

    </section>
  );
};

export default HeroSection;