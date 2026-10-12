import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Gamepad2 } from "lucide-react";
import { Game } from "@/data/Games";

interface ShowcaseModeProps {
  games: Game[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  onSelectGame: (game: Game) => void;
}

const textSlideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 50 : dir < 0 ? -50 : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -50 : dir < 0 ? 50 : 0,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  }),
};

function getOffset(index: number, current: number, total: number) {
  let diff = index - current;
  while (diff > total / 2) diff -= total;
  while (diff < -total / 2) diff += total;
  return diff;
}

export const ShowcaseMode = ({
  games,
  currentIndex,
  setCurrentIndex,
  onSelectGame,
}: ShowcaseModeProps) => {
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState<number>(() =>
    typeof window !== "undefined" ? Math.min(window.innerWidth * 0.82, 1152) : 1000
  );

  // Gestos de toque e swipe
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);

  const activeGame = games[currentIndex] || games[0];

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setCardWidth(containerRef.current.offsetWidth);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const step = cardWidth * 0.94 + 20;

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % games.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  const handleDotClick = (idx: number) => {
    if (idx === currentIndex) return;
    const diff = (idx - currentIndex + games.length) % games.length;
    const isForward = diff <= games.length / 2;
    setDirection(isForward ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Suporte ao touch no mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Suporte ao drag no desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseStartX.current !== null) {
      if (Math.abs(e.clientX - mouseStartX.current) > 10) {
        isDragging.current = true;
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseStartX.current !== null) {
      const deltaX = e.clientX - mouseStartX.current;
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) handleNext();
        else handlePrev();
      }
    }
    mouseStartX.current = null;
  };

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Carousel Container */}
      <div
        className="relative flex items-center justify-center w-full overflow-hidden py-4 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Stage Container */}
        <div
          ref={containerRef}
          className="relative w-[78vw] sm:w-[80vw] md:w-[82vw] max-w-6xl aspect-[16/10] sm:aspect-[21/10] md:aspect-[21/9] flex items-center justify-center pointer-events-none"
        >
          {games.map((game, i) => {
            const offset = getOffset(i, currentIndex, games.length);
            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 1.5;

            return (
              <motion.div
                key={game.id}
                initial={false}
                animate={{
                  x: offset * step,
                  scale: isCenter ? 1 : 0.88,
                  opacity: isCenter ? 1 : Math.abs(offset) === 1 ? 0.4 : 0,
                  zIndex: isCenter ? 20 : 10 - Math.abs(offset),
                }}
                transition={
                  isVisible
                    ? { duration: 0.45, ease: [0.25, 1, 0.5, 1] }
                    : { duration: 0 }
                }
                style={{
                  position: "absolute",
                  left: "50%",
                  marginLeft: -cardWidth / 2,
                  width: cardWidth,
                  height: "100%",
                  visibility: isVisible ? "visible" : "hidden",
                  pointerEvents: isCenter || Math.abs(offset) === 1 ? "auto" : "none",
                }}
                className="flex items-center justify-center will-change-transform transform-gpu"
              >
                <div
                  onClick={() => {
                    if (isDragging.current) return;
                    if (offset === 0) onSelectGame(game);
                    else if (offset === 1) handleNext();
                    else if (offset === -1) handlePrev();
                  }}
                  className={`relative w-full h-full bg-black border border-white/20 rounded-md shadow-2xl overflow-hidden cursor-pointer group origin-center transition-all duration-300 ${
                    isCenter
                      ? "hover:border-[#0051ff]/80 shadow-black/80"
                      : "hover:border-white/40 opacity-90 hover:opacity-100"
                  }`}
                  title={game.title}
                >
                  {/* Status Mark */}
                  {isCenter && (
                    <span className="absolute top-3 right-4 font-mono text-[9px] text-white/50 select-none z-20 bg-black/60 px-2 py-0.5 border border-white/10 rounded-sm">
                      {game.released ? "LANÇADO" : "EM DESENVOLVIMENTO"}
                    </span>
                  )}

                  <img
                    src={game.image}
                    alt={game.title}
                    className={`w-full h-full object-cover filter ${
                      isCenter ? "contrast-105 group-hover:scale-105" : "grayscale contrast-110"
                    } transition-transform duration-700`}
                  />

                  {/* Vignette Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      isCenter
                        ? "from-[#08080A] via-transparent to-transparent opacity-80"
                        : "bg-[#08080A]/60"
                    }`}
                  />

                  {/* Botão de Abrir */}
                  {isCenter && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <div className="px-5 py-2.5 bg-white text-black font-cyber font-bold text-xs uppercase tracking-wider hover:bg-[#0051ff] hover:text-white transition-colors flex items-center gap-2 rounded-sm shadow-xl">
                        <Gamepad2 className="w-4 h-4" />
                        <span>Abrir</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Botões de Navegação */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-black/70 border border-white/20 hover:border-[#0051ff] text-white transition-colors flex items-center justify-center shadow-2xl active:scale-95 pointer-events-auto"
          aria-label="Jogo anterior"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-black/70 border border-white/20 hover:border-[#0051ff] text-white transition-colors flex items-center justify-center shadow-2xl active:scale-95 pointer-events-auto"
          aria-label="Próximo jogo"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Informações do Banner */}
      <div className="container mx-auto px-4 mt-3 sm:mt-4 text-center max-w-3xl">
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
                <span
                  key={tag}
                  className="px-2.5 py-0.5 bg-white/[0.04] border border-white/10 font-mono text-[10px] text-[#9999A5] rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Nome */}
            <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wider uppercase leading-none">
              {activeGame.title}
            </h3>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-3">
          {games.map((_, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                idx === currentIndex ? "w-6 bg-[#0051ff]" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Ir para jogo ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
