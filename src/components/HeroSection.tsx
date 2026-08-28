import { motion } from 'framer-motion';
import { games } from '@/data/Games';
import { HoloPrism } from '@/components/ui/holoprism';
import HeroWaveGrid from '@/components/ui/herowave-grid.tsx';
import logoLedes from '@/assets/otimizadas/logo-mascote.webp';

import imgMuseum from '@/assets/otimizadas/game-museum.webp';
import imgJurupari from '@/assets/otimizadas/game-jurupari.webp';
import imgTheseus from '@/assets/otimizadas/game-theseus.webp';
import imgTeam3 from '@/assets/otimizadas/team-3.webp';
import imgTeam2 from '@/assets/otimizadas/team-2.webp';
import imgTurma2026 from '@/assets/otimizadas/turma2026.webp';

const HeroSection = () => {
  const gameImages = games.map(g => g.image).filter(Boolean);

  const allImages = [
    imgMuseum,
    imgJurupari,
    imgTheseus,
    imgTeam3,
    imgTeam2,
    imgTurma2026,
  ];

  return (
    <section id="hero" className="relative min-h-screen py-32 flex items-center justify-center overflow-hidden bg-preto-espacial">
      <HeroWaveGrid />

      {/* --- CUBOS DE FUNDO --- */}
      <div className="absolute top-[12%] left-[8%] sm:top-[20%] sm:left-[28%] z-0 scale-[25%] sm:scale-50 lg:scale-100 blur-[1px] lg:blur-[2.5px]">
        <HoloPrism size={90} tiltX={35} tiltZ={-15} initialAngleY={15} opacity={0.35} floatDuration={5.2} floatDelay={0.2} floatOffset={8} />
      </div>
      <div className="absolute top-[15%] right-[10%] sm:top-[18%] sm:right-[25%] z-0 scale-[25%] sm:scale-50 lg:scale-100 blur-[1.5px] lg:blur-[3px]">
        <HoloPrism size={100} tiltX={-40} tiltZ={20} initialAngleY={110} opacity={0.3} floatDuration={6.0} floatDelay={1.5} floatOffset={10} />
      </div>
      <div className="absolute bottom-[22%] left-[12%] sm:bottom-[18%] sm:left-[22%] z-0 scale-[25%] sm:scale-50 lg:scale-100 blur-[1px] lg:blur-[2px]">
        <HoloPrism size={110} tiltX={-20} tiltZ={10} initialAngleY={70} opacity={0.4} floatDuration={4.8} floatDelay={0.8} floatOffset={12} />
      </div>
      <div className="absolute bottom-[20%] right-[12%] sm:bottom-[22%] sm:right-[20%] z-0 scale-[25%] sm:scale-50 lg:scale-100 blur-[1px] lg:blur-[2.5px]">
        <HoloPrism size={85} tiltX={30} tiltZ={-12} initialAngleY={210} opacity={0.35} floatDuration={5.5} floatDelay={2.1} floatOffset={9} />
      </div>

      {/* --- PRISMAS HOLOGRÁFICOS - LADO ESQUERDO --- */}
      <div className="absolute z-10 origin-center scale-[30%] sm:scale-50 lg:scale-100 top-[8%] left-[2%] sm:top-[10%] sm:left-[0%] lg:top-[18%] lg:left-[6%]">
        <HoloPrism image={allImages[0]} size={180} tiltX={-38} tiltZ={-10} initialAngleY={55} floatDuration={4.2} floatDelay={0.3} floatOffset={14} />
      </div>
      <div className="absolute z-10 origin-center scale-[30%] sm:scale-75 lg:scale-100 top-[38%] left-[0%] sm:top-[35%] sm:left-[-5%] lg:top-[32%] lg:left-[20%]">
        <HoloPrism image={allImages[1]} size={230} tiltX={22} tiltZ={8} initialAngleY={-40} floatDuration={5.0} floatDelay={1.2} floatOffset={16} />
      </div>
      <div className="absolute z-10 origin-center scale-[30%] sm:scale-50 lg:scale-100 bottom-[12%] left-[4%] sm:bottom-[10%] sm:left-[2%] lg:bottom-[12%] lg:left-[8%]">
        <HoloPrism image={allImages[2]} size={185} tiltX={-32} tiltZ={-12} initialAngleY={45} floatDuration={4.6} floatDelay={2.4} floatOffset={11} />
      </div>

      {/* --- PRISMAS HOLOGRÁFICOS - LADO DIREITO --- */}
      <div className="absolute z-10 origin-center scale-[30%] sm:scale-50 lg:scale-100 top-[10%] right-[2%] sm:top-[12%] sm:right-[0%] lg:top-[10%] lg:right-[7%]">
        <HoloPrism image={allImages[3]} size={165} tiltX={-26} tiltZ={12} initialAngleY={-35} floatDuration={4.8} floatDelay={1.8} floatOffset={13} />
      </div>
      <div className="absolute z-10 origin-center scale-[30%] sm:scale-75 lg:scale-100 top-[42%] right-[0%] sm:top-[42%] sm:right-[-5%] lg:top-[40%] lg:right-[16%]">
        <HoloPrism image={allImages[4] || allImages[0]} size={210} tiltX={30} tiltZ={-6} initialAngleY={50} floatDuration={5.4} floatDelay={0.7} floatOffset={18} />
      </div>
      <div className="absolute z-10 origin-center scale-[30%] sm:scale-50 lg:scale-100 bottom-[16%] right-[4%] sm:bottom-[15%] sm:right-[2%] lg:bottom-[16%] lg:right-[6%]">
        <HoloPrism image={allImages[5] || allImages[1]} size={175} tiltX={-18} tiltZ={14} initialAngleY={-60} floatDuration={4.0} floatDelay={2.0} floatOffset={12} />
      </div>

      {/* --- CONTEÚDO CENTRAL --- */}
      <div className="container mx-auto px-4 relative z-20 text-center max-w-4xl pt-12 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-6 sm:mb-8"
        >
          <img
            src={logoLedes}
            alt="LEDES Games Logo"
            className="w-32 sm:w-48 md:w-72 lg:w-96 h-auto object-contain drop-shadow-[0_0_25px_rgba(41,255,198,0.4)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 sm:space-y-6"
        >
          <h1 className="text-2xl sm:text-5xl md:text-6xl font-syne font-extrabold text-branco-soft tracking-tight uppercase">
            LEDES <span className="text-verde-agua drop-shadow-[0_0_12px_rgba(41,255,198,0.5)]">GAMES</span>
          </h1>

          <p className="text-cinza-futurista font-sans text-xs sm:text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
            Unimos pesquisa acadêmica e design de jogos para criar experiências que ensinam, engajam e sejam memoráveis.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-cinza-futurista"
      >
        <span className="text-[10px] sm:text-xs font-pixel tracking-widest uppercase">Role para explorar</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-6 sm:w-5 sm:h-8 rounded-full border-2 border-verde-agua/50 flex items-start justify-center p-1"
        >
          <div className="w-1 h-1.5 rounded-full bg-verde-agua" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;