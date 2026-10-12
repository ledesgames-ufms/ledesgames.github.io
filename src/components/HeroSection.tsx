import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Gamepad2, BookOpen, Terminal } from 'lucide-react';
import logoMascote from '@/assets/logo-mascote.png';
import team1 from '@/assets/team-1.jpg';
import team2 from '@/assets/team-2.jpg';
import team3 from '@/assets/team-3.jpg';
import { games } from '@/data/Games';
import { HoloPrism } from '@/components/ui/holoprism';

const institutionalPhotos = [
  { id: 'photo-1', src: team1, title: 'Mini Curso 2D', tag: 'OFICINA' },
  { id: 'photo-2', src: team2, title: 'SBGames 2025', tag: 'PESQUISA' },
  { id: 'photo-3', src: team3, title: 'Mini Curso 2D', tag: 'OFICINA' },
];

const HeroSection = () => {
  const [gameIndex, setGameIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Rotação a cada 10 segundos
  useEffect(() => {
    const gameTimer = setInterval(() => {
      setGameIndex((prev) => (prev + 1) % games.length);
    }, 10000);

    const photoTimer = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % institutionalPhotos.length);
    }, 10000);

    return () => {
      clearInterval(gameTimer);
      clearInterval(photoTimer);
    };
  }, []);

  const currentGame = games[gameIndex] || games[0];
  const currentPhoto = institutionalPhotos[photoIndex] || institutionalPhotos[0];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-16 sm:pt-20 pb-6 flex flex-col justify-between bg-[#08080A] text-white overflow-hidden border-b border-white/10"
    >
      {/* ========================================================================= */}
      {/* ARTE DE FUNDO                                                             */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-25 filter contrast-110">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-full w-full">
          {games.map((g, i) => (
            <div key={i} className="relative h-full overflow-hidden border-r border-white/5">
              <img 
                src={g.image} 
                alt={g.title} 
                className="w-full h-full object-cover filter grayscale-[40%]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/60 to-[#08080A]/80" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080A] via-transparent to-[#08080A]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#08080A]/70 to-[#08080A]" />
      </div>

      {/* ========================================================================= */}
      {/* Main Studio Hero Content                                                  */}
      {/* ========================================================================= */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 my-auto">
        <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center py-2 sm:py-4">
          
          {/* PRISMA ESQUERDA: JOGOS */}
          <div className="absolute left-0 lg:left-4 top-1/2 -translate-y-1/2 hidden md:block select-none z-20">
            <motion.div
              key={currentGame.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <HoloPrism 
                image={currentGame.image} 
                size={160} 
                tiltX={-20} 
                tiltZ={-8} 
                floatDuration={4.5} 
                floatDelay={0} 
              />

              {/* Título do Prisma */}
              <div className="absolute -bottom-3 -right-3 z-30 bg-[#0E0E12]/95 border border-white/20 backdrop-blur-md px-3 py-1.5 shadow-2xl">
                <p className="font-display text-sm uppercase text-white tracking-wider truncate max-w-[130px] leading-tight">
                  {currentGame.title}
                </p>
              </div>
            </motion.div>
          </div>

          {/* CENTRO: MASCOTE */}
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex items-center justify-center p-2"
            >
              {/* Retículas */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#0051ff]/30 animate-[spin_60s_linear_infinite] pointer-events-none" />
              <div className="absolute -inset-4 rounded-full border border-white/5 pointer-events-none" />

              <div className="relative z-10 w-56 h-56 sm:w-64 h-64 md:w-[320px] md:h-[320px] lg:w-[350px] lg:h-[350px] flex items-center justify-center">
                <img
                  src={logoMascote}
                  alt="LEDES Games Mascote"
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,81,255,0.3)] select-none"
                />
              </div>
            </motion.div>

            {/* LEDES GAMES */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-1 text-center"
            >
              <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.25em] text-white uppercase block font-normal drop-shadow-lg">
                LEDES GAMES
              </span>
            </motion.div>
          </div>

          {/* PRISMA DIREITA: FOTOS / EVENTOS */}
          <div className="absolute right-0 lg:right-4 top-1/2 -translate-y-1/2 hidden md:block select-none z-20">
            <motion.div
              key={currentPhoto.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <HoloPrism 
                image={currentPhoto.src} 
                size={160} 
                tiltX={-22} 
                tiltZ={10} 
                floatDuration={4.8} 
                floatDelay={0.5} 
              />

              {/* Título do Prisma */}
              <div className="absolute -bottom-3 -left-3 z-30 bg-[#0E0E12]/95 border border-white/20 backdrop-blur-md px-3 py-1.5 shadow-2xl">
                <p className="font-display text-sm uppercase text-white tracking-wider truncate max-w-[130px] leading-tight">
                  {currentPhoto.title}
                </p>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* TEXTO PRINCIPAL                                                           */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-3 mt-2">

          {/* Parágrafo de Apresentação */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#9999A5] font-sans text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Unindo pesquisa acadêmica, engenharia de software, engenharia de áudio e arte digital para produzir experiências interativas, educativas e úteis para a sociedade.
          </motion.p>

          {/* Botões de Ação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-1"
          >
            <button
              onClick={() => scrollToSection('games')}
              className="w-44 sm:w-48 h-12 bg-[#0051ff] text-white hover:bg-white hover:text-black font-cyber font-bold text-xs uppercase tracking-widest transition-all duration-300 tech-cut-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#0051ff]/20"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>JOGOS</span>
            </button>

            <div className="w-44 sm:w-48 h-12 p-[1px] bg-white/20 hover:bg-[#0051ff] transition-colors duration-300 tech-cut-sm group">
              <button
                onClick={() => scrollToSection('research')}
                className="w-full h-full bg-[#08080A] group-hover:bg-[#0051ff] text-white font-cyber font-bold text-xs uppercase tracking-widest transition-all duration-300 tech-cut-sm flex items-center justify-center gap-2.5"
              >
                <BookOpen className="w-4 h-4 text-[#0051ff] group-hover:text-white transition-colors duration-300" />
                <span>PESQUISA</span>
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll */}
      <div className="flex justify-center pt-10 pb-1">
        <button 
          onClick={() => scrollToSection('games')}
          className="flex flex-col items-center gap-1 text-white/40 hover:text-white transition-colors group"
          aria-label="Rolar para os jogos"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.25em]">EXPLORE</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#0051ff]" />
        </button>
      </div>

    </section>
  );
};

export default HeroSection;