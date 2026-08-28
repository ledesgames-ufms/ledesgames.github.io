import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ArrowUpRight,
  Tv,
  Rows3,
  Grid3X3,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
} from "lucide-react";
import { games, Game } from "@/data/Games";
import GameModal from "@/components/GameModal";

type ViewMode = "showcase" | "console" | "matrix";

const bannerSlideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 180 : dir < 0 ? -180 : 0,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 280, damping: 30 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 }
    }
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -180 : dir < 0 ? 180 : 0,
    opacity: 0,
    scale: 0.96,
    transition: {
      x: { type: "spring", stiffness: 280, damping: 30 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 }
    }
  })
};

const textSlideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 50 : dir < 0 ? -50 : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" }
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -50 : dir < 0 ? 50 : 0,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" }
  })
};

const GameGrid = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("showcase");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [modalGame, setModalGame] = useState<Game | null>(null);

  const activeGame = games[currentIndex] || games[0];
  const prevIndex = (currentIndex - 1 + games.length) % games.length;
  const nextIndex = (currentIndex + 1) % games.length;
  const prevGame = games[prevIndex];
  const nextGame = games[nextIndex];

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(prevIndex);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(nextIndex);
  };

  const handleDotClick = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  return (
    <>
      <section
        id="games"
        className="relative bg-[#0E0E12] py-28 text-white border-b border-white/10 overflow-hidden"
      >
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* Section Header */}
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#9999A5] mb-2">
                <span className="w-1.5 h-1.5 bg-[#0051ff]" />
                <span>CATÁLOGO // PRODUÇÃO DE JOGOS</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl tracking-wider text-white uppercase leading-none">
                Jogos <span className="text-[#0051ff]">Desenvolvidos</span>
              </h2>
            </div>

            {/* View Mode Selector */}
            <div className="flex items-center gap-1.5 border border-white/15 bg-white/[0.02] p-1">
              <button
                type="button"
                onClick={() => setViewMode("showcase")}
                className={`flex h-9 items-center gap-2 px-3.5 font-cyber text-xs uppercase tracking-wider transition-all ${
                  viewMode === "showcase"
                    ? "bg-[#0051ff] font-bold text-white shadow-md shadow-[#0051ff]/30"
                    : "text-[#9999A5] hover:text-white hover:bg-white/[0.04]"
                }`}
                title="Modo Showcase"
              >
                <Tv className="h-3.5 w-3.5" />
                <span>Showcase</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("console")}
                className={`flex h-9 items-center gap-2 px-3.5 font-cyber text-xs uppercase tracking-wider transition-all ${
                  viewMode === "console"
                    ? "bg-[#0051ff] font-bold text-white shadow-md shadow-[#0051ff]/30"
                    : "text-[#9999A5] hover:text-white hover:bg-white/[0.04]"
                }`}
                title="Modo Console"
              >
                <Rows3 className="h-3.5 w-3.5" />
                <span>Console</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("matrix")}
                className={`flex h-9 items-center gap-2 px-3.5 font-cyber text-xs uppercase tracking-wider transition-all ${
                  viewMode === "matrix"
                    ? "bg-[#0051ff] font-bold text-white shadow-md shadow-[#0051ff]/30"
                    : "text-[#9999A5] hover:text-white hover:bg-white/[0.04]"
                }`}
                title="Modo Grade de Posters"
              >
                <Grid3X3 className="h-3.5 w-3.5" />
                <span>Posters</span>
              </button>
            </div>
          </header>
        </div>

        {/* ========================================================================= */}
          {/* MODO 1: SHOWCASE                                                          */}
        {/* ========================================================================= */}
        {viewMode === "showcase" && (
          <div className="relative w-full overflow-hidden">
            
            {/* Grand Bleed Carousel Container */}
            <div className="relative flex items-center justify-center w-full min-h-[360px] sm:min-h-[460px] md:min-h-[540px] lg:min-h-[600px]">
              
              {/* Central Track */}
              <div className="flex items-center justify-center gap-3.5 sm:gap-4 lg:gap-5 w-[220vw] shrink-0 pointer-events-none">
                
                {/* PREVIOUS PEEK (Quase todo fora da tela, apenas ponta visível) */}
                <div 
                  onClick={handlePrev}
                  className="w-[78vw] sm:w-[80vw] md:w-[82vw] max-w-6xl aspect-[16/10] sm:aspect-[21/10] md:aspect-[21/9] rounded-md overflow-hidden bg-black border border-white/15 opacity-40 hover:opacity-75 transition-opacity cursor-pointer pointer-events-auto shrink-0 shadow-2xl relative"
                  title={`Anterior: ${prevGame.title}`}
                >
                  <img 
                    src={prevGame.image} 
                    alt={prevGame.title} 
                    className="w-full h-full object-cover filter grayscale contrast-110"
                  />
                  <div className="absolute inset-0 bg-[#08080A]/60" />
                </div>

                {/* ACTIVE GAME */}
                <div className="w-[78vw] sm:w-[80vw] md:w-[82vw] max-w-6xl aspect-[16/10] sm:aspect-[21/10] md:aspect-[21/9] pointer-events-auto shrink-0 z-10">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={activeGame.id}
                      custom={direction}
                      variants={bannerSlideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      onClick={() => setModalGame(activeGame)}
                      className="relative w-full h-full bg-black border border-white/20 rounded-md shadow-2xl overflow-hidden cursor-pointer group"
                    >
                      {/* Corner Marks */}
                      <span className="absolute top-3 left-4 font-mono text-[9px] text-[#0051ff] select-none z-20 font-bold">+ LG-0{activeGame.id}</span>
                      <span className="absolute top-3 right-4 font-mono text-[9px] text-white/50 select-none z-20 bg-black/60 px-2 py-0.5 border border-white/10 rounded-sm">
                        {activeGame.released ? 'ESTÁVEL // LANÇADO' : 'EM DESENVOLVIMENTO'}
                      </span>

                      <img
                        src={activeGame.image}
                        alt={activeGame.title}
                        className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-transparent opacity-80" />

                      {/* Click Trigger Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                        <div className="px-5 py-2.5 bg-white text-black font-cyber font-bold text-xs uppercase tracking-wider hover:bg-[#0051ff] hover:text-white transition-colors flex items-center gap-2 rounded-sm shadow-xl">
                          <Gamepad2 className="w-4 h-4" />
                          <span>Abrir Detalhes do Jogo</span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* NEXT PEEK (Direita) */}
                <div 
                  onClick={handleNext}
                  className="w-[78vw] sm:w-[80vw] md:w-[82vw] max-w-6xl aspect-[16/10] sm:aspect-[21/10] md:aspect-[21/9] rounded-md overflow-hidden bg-black border border-white/15 opacity-40 hover:opacity-75 transition-opacity cursor-pointer pointer-events-auto shrink-0 shadow-2xl relative"
                  title={`Próximo: ${nextGame.title}`}
                >
                  <img 
                    src={nextGame.image} 
                    alt={nextGame.title} 
                    className="w-full h-full object-cover filter grayscale contrast-110"
                  />
                  <div className="absolute inset-0 bg-[#08080A]/60" />
                </div>

              </div>

              {/* Botões de Navegação */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white text-black hover:bg-[#0051ff] hover:text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 pointer-events-auto active:scale-95"
                aria-label="Jogo anterior"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white text-black hover:bg-[#0051ff] hover:text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 pointer-events-auto active:scale-95"
                aria-label="Próximo jogo"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

            </div>

            {/* Informações do Banner */}
            <div className="container mx-auto px-4 mt-4 sm:mt-5 text-center max-w-3xl min-h-[90px] flex flex-col justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeGame.id}
                  custom={direction}
                  variants={textSlideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-2"
                >
                  {/* Tags */}
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#0051ff] text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-sm">
                      {activeGame.released ? "LANÇADO" : "EM DESENVOLVIMENTO"}
                    </span>
                    {activeGame.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 bg-white/[0.04] border border-white/10 font-mono text-[10px] text-[#9999A5] rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Nome */}
                  <h3 className="font-display text-4xl sm:text-6xl text-white tracking-wider uppercase leading-none">
                    {activeGame.title}
                  </h3>
                </motion.div>
              </AnimatePresence>

              {/* Slider Navigation Dots */}
              <div className="flex items-center justify-center gap-1.5 pt-3">
                {games.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      idx === currentIndex ? 'w-6 bg-[#0051ff]' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Ir para jogo ${idx + 1}`}
                  />
                ))}
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* MODO 2: CONSOLE / LISTA TÉCNICA                                           */}
        {/* ========================================================================= */}
        {viewMode === "console" && (
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Project Index */}
              <div className="lg:col-span-5 bg-[#08080A] border border-white/15 divide-y divide-white/5 rounded-lg overflow-hidden">
                <div className="p-4 bg-white/[0.02] border-b border-white/10 flex items-center justify-between font-mono text-[10px] text-[#9999A5] uppercase tracking-wider">
                  <span>[ ÍNDICE DE PROJETOS ]</span>
                  <span>TOTAL: {games.length}</span>
                </div>

                <div className="divide-y divide-white/5">
                  {games.map((game, idx) => {
                    const isSelected = idx === currentIndex;
                    return (
                      <div
                        key={game.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`p-4 flex items-center justify-between gap-3 cursor-pointer transition-all ${
                          isSelected
                            ? "bg-[#0051ff]/10 border-l-4 border-l-[#0051ff]"
                            : "hover:bg-white/[0.02] border-l-4 border-l-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono text-xs text-[#0051ff] font-bold">
                            LG-0{game.id}
                          </span>
                          
                          <div className="min-w-0">
                            <h4 className={`font-display text-lg tracking-wide uppercase truncate ${
                              isSelected ? "text-white" : "text-[#D4D4D8]"
                            }`}>
                              {game.title}
                            </h4>
                            <div className="flex items-center gap-2 font-mono text-[10px] text-[#9999A5] truncate">
                              <span>{game.tags.slice(0, 2).join(" // ")}</span>
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <span className={`px-2 py-0.5 font-mono text-[8px] uppercase border rounded-sm ${
                            game.released
                              ? "border-[#0051ff]/40 bg-[#0051ff]/10 text-[#0051ff]"
                              : "border-white/20 bg-white/[0.02] text-[#9999A5]"
                          }`}>
                            {game.released ? "LANÇADO" : "EM DESENVOLVIMENTO"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Inspection Panel */}
              <div className="lg:col-span-7 bg-[#08080A] border border-white/15 p-6 sm:p-8 space-y-6 rounded-lg">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[10px] text-[#9999A5]">
                  <span>INSPEÇÃO TÉCNICA: LG-0{activeGame.id}</span>
                  <span className="text-[#0051ff]">STATUS: {activeGame.released ? 'ESTÁVEL // DISPONÍVEL' : 'EM DESENVOLVIMENTO'}</span>
                </div>

                <div className="relative aspect-video bg-black overflow-hidden border border-white/10 rounded-lg">
                  <img
                    src={activeGame.image}
                    alt={activeGame.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-wider mb-2">
                    {activeGame.title}
                  </h3>
                  <p className="font-sans text-sm text-[#9999A5] leading-relaxed">
                    {activeGame.longDescription || activeGame.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-4 font-mono text-xs">
                  <div>
                    <span className="text-[#9999A5] block text-[10px] uppercase">Gênero / Tags</span>
                    <span className="text-white font-medium">{activeGame.tags.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-[#9999A5] block text-[10px] uppercase">Período de Produção</span>
                    <span className="text-white font-medium">{activeGame.developmentDates?.start}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={activeGame.playUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#0051ff] text-white hover:bg-white hover:text-black font-cyber font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 rounded-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Jogar no Itch.io</span>
                  </a>

                  <button
                    onClick={() => setModalGame(activeGame)}
                    className="px-5 py-3 bg-white/[0.04] border border-white/20 text-white hover:border-[#0051ff] font-cyber font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 rounded-sm"
                  >
                    <span>Abrir Ficha Técnica</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODO 3: POSTER MATRIX                                                     */}
        {/* ========================================================================= */}
        {viewMode === "matrix" && (
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {games.map((game) => (
                <article
                  key={game.id}
                  onClick={() => setModalGame(game)}
                  className="group relative bg-[#08080A] border border-white/15 hover:border-[#0051ff] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer rounded-lg shadow-lg"
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-black">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between font-mono text-[8px]">
                      <span className="px-1.5 py-0.5 bg-[#0051ff] text-white font-bold rounded-sm">
                        LG-0{game.id}
                      </span>
                      <span className="px-1.5 py-0.5 bg-black/70 border border-white/10 text-white/80 rounded-sm">
                        {game.released ? "LANÇADO" : "DEV"}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {game.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="font-mono text-[8px] text-[#9999A5] bg-white/[0.03] px-1.5 py-0.5 border border-white/10 rounded-sm">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-display text-2xl text-white uppercase tracking-wider group-hover:text-[#0051ff] transition-colors leading-tight truncate">
                      {game.title}
                    </h3>

                    <p className="font-sans text-[11px] text-[#9999A5] line-clamp-2 leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between border-t border-white/10 pt-3 mt-auto">
                    <span className="font-mono text-[9px] text-[#9999A5]">
                      {game.developmentDates?.start}
                    </span>
                    <span className="font-mono text-[10px] text-white group-hover:text-[#0051ff] font-bold flex items-center gap-1">
                      <span>ABRIR</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

      </section>

      <GameModal
        isOpen={Boolean(modalGame)}
        onClose={() => setModalGame(null)}
        game={modalGame}
      />
    </>
  );
};

export default GameGrid;