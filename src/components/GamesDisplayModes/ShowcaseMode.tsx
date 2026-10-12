import { useState, useRef } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
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

export const ShowcaseMode = ({
  games,
  currentIndex,
  setCurrentIndex,
  onSelectGame,
}: ShowcaseModeProps) => {
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const controls = useAnimationControls();
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const activeGame = games[currentIndex] || games[0];

  const getStep = () => {
    if (trackRef.current && trackRef.current.children.length >= 4) {
      const slot0 = trackRef.current.children[2] as HTMLElement;
      const slot1 = trackRef.current.children[3] as HTMLElement;
      if (slot0 && slot1) {
        const dist = slot1.offsetLeft - slot0.offsetLeft;
        if (dist > 0) return dist;
      }
    }
    if (cardRef.current) {
      return cardRef.current.offsetWidth + 16;
    }
    if (typeof window !== "undefined") {
      return Math.min(window.innerWidth * 0.82, 1152) + 16;
    }
    return 1000;
  };

  const handleNext = async () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(1);
    const step = getStep();

    await controls.start({
      x: -step,
      transition: { type: "spring", stiffness: 280, damping: 30 },
    });

    setCurrentIndex((prev) => (prev + 1) % games.length);
    controls.set({ x: 0 });
    setIsTransitioning(false);
  };

  const handlePrev = async () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(-1);
    const step = getStep();

    await controls.start({
      x: step,
      transition: { type: "spring", stiffness: 280, damping: 30 },
    });

    setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);
    controls.set({ x: 0 });
    setIsTransitioning(false);
  };

  const handleDotClick = async (idx: number) => {
    if (idx === currentIndex || isTransitioning) return;
    const diff = (idx - currentIndex + games.length) % games.length;
    const isForward = diff <= games.length / 2;
    const dir = isForward ? 1 : -1;

    setIsTransitioning(true);
    setDirection(dir);
    const step = getStep();

    await controls.start({
      x: dir > 0 ? -step : step,
      transition: { type: "spring", stiffness: 280, damping: 30 },
    });

    setCurrentIndex(idx);
    controls.set({ x: 0 });
    setIsTransitioning(false);
  };

  const getGameAt = (offset: number) => {
    const idx = (currentIndex + offset + games.length * 10) % games.length;
    return games[idx];
  };

  const slots = [-2, -1, 0, 1, 2];
  const springTransition = { type: "spring", stiffness: 280, damping: 30 };

  const getCardAnimation = (offset: number) => {
    if (!isTransitioning) {
      return {
        height: offset === 0 ? "100%" : "88%",
        opacity: offset === 0 ? 1 : 0.4,
        transition: springTransition,
      };
    }

    if (direction === 1) {
      if (offset === 1) return { height: "100%", opacity: 1, transition: springTransition };
      if (offset === 0) return { height: "88%", opacity: 0.4, transition: springTransition };
      return { height: "88%", opacity: 0.4, transition: springTransition };
    }

    if (direction === -1) {
      if (offset === -1) return { height: "100%", opacity: 1, transition: springTransition };
      if (offset === 0) return { height: "88%", opacity: 0.4, transition: springTransition };
      return { height: "88%", opacity: 0.4, transition: springTransition };
    }

    return {
      height: offset === 0 ? "100%" : "88%",
      opacity: offset === 0 ? 1 : 0.4,
      transition: springTransition,
    };
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel Container */}
      <div className="relative flex items-center justify-center w-full overflow-hidden">
        {/* Central Moving Track */}
        <motion.div
          ref={trackRef}
          animate={controls}
          className="flex items-center justify-center gap-3 sm:gap-3.5 md:gap-4 shrink-0"
        >
          {slots.map((offset) => {
            const game = getGameAt(offset);
            const isCenter = offset === 0;

            return (
              <div
                key={offset}
                ref={isCenter ? cardRef : undefined}
                className="w-[78vw] sm:w-[80vw] md:w-[82vw] max-w-6xl aspect-[16/10] sm:aspect-[21/10] md:aspect-[21/9] shrink-0 pointer-events-auto select-none relative flex items-center justify-center"
              >
                <motion.div
                  animate={getCardAnimation(offset)}
                  whileHover={!isCenter && !isTransitioning ? { opacity: 0.75 } : undefined}
                  onClick={() => {
                    if (isTransitioning) return;
                    if (offset === 0) onSelectGame(game);
                    else if (offset === 1) handleNext();
                    else if (offset === -1) handlePrev();
                  }}
                  className={`relative w-full bg-black border border-white/20 rounded-md shadow-2xl overflow-hidden cursor-pointer group origin-center transition-shadow ${
                    isCenter ? "hover:border-[#0051ff]/80" : "hover:border-white/40"
                  }`}
                  title={game.title}
                >
                  {/* Corner Marks */}
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

                  {/* Click Trigger Overlay */}
                  {isCenter && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <div className="px-5 py-2.5 bg-white text-black font-cyber font-bold text-xs uppercase tracking-wider hover:bg-[#0051ff] hover:text-white transition-colors flex items-center gap-2 rounded-sm shadow-xl">
                        <Gamepad2 className="w-4 h-4" />
                        <span>Abrir</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* Botões de Navegação */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={isTransitioning}
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:p-3 bg-black/70 border border-white/20 hover:border-[#0051ff] text-white transition-colors flex items-center justify-center shadow-2xl transition-all duration-300 pointer-events-auto active:scale-95 disabled:opacity-40"
          aria-label="Jogo anterior"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={isTransitioning}
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:p-3 bg-black/70 border border-white/20 hover:border-[#0051ff] text-white transition-colors flex items-center justify-center shadow-2xl transition-all duration-300 pointer-events-auto active:scale-95 disabled:opacity-40"
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
              disabled={isTransitioning}
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
