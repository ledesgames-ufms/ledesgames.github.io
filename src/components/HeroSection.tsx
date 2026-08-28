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
  { id: 'photo-3', src: team3, title: 'Equipe no Campus', tag: 'EXTENSÃO' },
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
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between bg-[#08080A] text-white overflow-hidden border-b border-white/10"
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
        {/* Vinheta Central & Gradiente Global */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080A] via-transparent to-[#08080A]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#08080A]/70 to-[#08080A]" />
      </div>

      {/* Decorative Corner HUD Elements */}
      <div className="absolute top-24 left-6 hidden lg:block font-mono text-[10px] text-white/30 tracking-[0.25em] select-none z-10">
        <p>[SYS.STATUS: ONLINE]</p>
        <p>LAB: FACOM // UFMS</p>
      </div>

      <div className="absolute top-24 right-6 hidden lg:block font-mono text-[10px] text-right text-white/30 tracking-[0.25em] select-none z-10">
        <p>COORD: 20°30'18"S 54°36'48"W</p>
        <p>[SECTOR: GAME_RESEARCH]</p>
      </div>

      {/* ========================================================================= */}
      {/* Main Studio Hero Content                                                  */}
      {/* ========================================================================= */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 my-auto">
        <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center py-4 sm:py-6">
          
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
                size={180} 
                tiltX={-20} 
                tiltZ={-8} 
                floatDuration={4.5} 
                floatDelay={0} 
              />

              {/* Título do Prisma */}
              <div className="absolute -bottom-3 -right-3 z-30 bg-[#0E0E12]/95 border border-white/20 backdrop-blur-md px-3 py-1.5 shadow-2xl">
                <div className="flex items-center gap-1.5 font-mono text-[8px] text-[#0051ff] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0051ff] animate-pulse" />
                  <span>LG-0{currentGame.id} // JOGO</span>
                </div>
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
              {/* Retículas orbitais */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#0051ff]/30 animate-[spin_60s_linear_infinite] pointer-events-none" />
              <div className="absolute -inset-4 rounded-full border border-white/5 pointer-events-none" />

              <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] flex items-center justify-center">
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
              <span className="font-display text-2xl sm:text-3xl md:text-4xl tracking-[0.35em] text-white uppercase block font-normal drop-shadow-md">
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
                size={180} 
                tiltX={-22} 
                tiltZ={10} 
                floatDuration={4.8} 
                floatDelay={0.5} 
              />

              {/* Título do Prisma */}
              <div className="absolute -bottom-3 -left-3 z-30 bg-[#0E0E12]/95 border border-white/20 backdrop-blur-md px-3 py-1.5 shadow-2xl">
                <div className="flex items-center gap-1.5 font-mono text-[8px] text-white/80 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
                  <span>FACOM // {currentPhoto.tag}</span>
                </div>
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
        <div className="text-center max-w-4xl mx-auto space-y-4 mt-2">
          
          {/* Badge de Estúdio */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/[0.03] border border-white/10 font-mono text-[11px] uppercase tracking-wider text-white/80"
          >
            <Terminal className="w-3.5 h-3.5 text-[#0051ff]" />
            <span>LABORATÓRIO DE DESENVOLVIMENTO DE JOGOS // FACOM UFMS</span>
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl md:text-8xl tracking-wider uppercase text-white leading-[0.9]"
          >
            CRIANDO JOGOS COM <span className="text-[#0051ff]">CIÊNCIA</span>
          </motion.h1>

          {/* Parágrafo de Apresentação */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#9999A5] font-sans text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Unimos pesquisa acadêmica de ponta, engenharia de software e arte digital para produzir experiências interativas memoráveis, educativas e autorais na FACOM/UFMS.
          </motion.p>

          {/* Botões de Ação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={() => scrollToSection('games')}
              className="px-8 py-3.5 bg-[#0051ff] text-white hover:bg-white hover:text-black font-cyber font-bold text-xs uppercase tracking-widest transition-all duration-300 tech-cut-sm flex items-center gap-2.5 shadow-lg shadow-[#0051ff]/20"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>EXPLORAR JOGOS</span>
            </button>

            <button
              onClick={() => scrollToSection('research')}
              className="px-8 py-3.5 bg-white/[0.02] border border-white/20 text-white hover:border-[#0051ff] hover:bg-white/[0.05] font-cyber font-bold text-xs uppercase tracking-widest transition-all duration-300 tech-cut-sm flex items-center gap-2.5"
            >
              <BookOpen className="w-4 h-4 text-[#0051ff]" />
              <span>PESQUISA CIENTÍFICA</span>
            </button>
          </motion.div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MÉTRICAS + INDICADOR DE SCROLL                            */}
      {/* ========================================================================= */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10 pt-6">
          <div className="text-center md:text-left">
            <span className="font-display text-3xl sm:text-4xl text-white tracking-wider block">05+</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#9999A5]">Jogos Autorais</span>
          </div>

          <div className="text-center md:text-left">
            <span className="font-display text-3xl sm:text-4xl text-[#0051ff] tracking-wider block">2+</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#9999A5]">Publicações</span>
          </div>

          <div className="text-center md:text-left">
            <span className="font-display text-3xl sm:text-4xl text-white tracking-wider block">100%</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#9999A5]">Open Research</span>
          </div>

          <div className="text-center md:text-left">
            <span className="font-display text-3xl sm:text-4xl text-white tracking-wider block">LEDES</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#9999A5]">Lab Oficial UFMS</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center pt-6">
          <button 
            onClick={() => scrollToSection('games')}
            className="flex flex-col items-center gap-1.5 text-white/40 hover:text-white transition-colors group"
            aria-label="Rolar para os jogos"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.25em]">ROLAR PARA EXPLORAR</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#0051ff]" />
          </button>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;