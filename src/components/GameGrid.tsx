import { useState } from 'react';
import { motion } from 'framer-motion';
import { games, Game } from '@/data/Games';
import { Loader2 } from 'lucide-react';
import loadingCapibaraGif from '@/assets/loading_capibara.gif';
import GameModal from './GameModal';

const GameGrid = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  return (
    <>
      <section id="games" className="relative py-24 bg-preto-espacial overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-verde-agua/70 to-transparent shadow-[0_0_15px_rgba(41,255,198,0.6)] z-20" />
        <div className="absolute top-[1px] left-0 w-full h-[10px] bg-gradient-to-r from-transparent via-verde-agua/10 to-transparent blur-sm z-20" />

        <style>{`
          .bg-grid-reto {
            background-size: 50px 50px;
            background-image:
              linear-gradient(to right, rgba(41, 255, 198, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(41, 255, 198, 0.05) 1px, transparent 1px);
            mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
          }
          .image-crt-scanlines {
            background: linear-gradient(
              rgba(18, 16, 16, 0) 50%,
              rgba(0, 0, 0, 0.25) 50%
            );
            background-size: 100% 3px;
            pointer-events: none;
          }
          .image-crt-vignette {
            background: radial-gradient(
              circle at center,
              transparent 60%,
              rgba(0, 0, 0, 0.5) 100%
            );
            pointer-events: none;
          }
          .image-screen-glow {
            background: rgba(41, 255, 198, 0.03); 
            pointer-events: none;
          }
        `}</style>
        
        <div className="absolute inset-0 z-0 bg-grid-reto pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-syne font-bold text-branco-soft tracking-wide uppercase drop-shadow-md">
              Nossos Games
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {games.map((game, index) => {
              const isDev = game.released === false;
              const isFeatured = game.isFeatured === true;

              return (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedGame(game)}
                  className="group relative cursor-pointer flex flex-col w-full aspect-square transition-transform duration-300 group-hover:-translate-y-1"
                >
                  
                  <svg
                    className="absolute inset-0 w-full h-full text-verde-agua opacity-60 group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_rgba(41,255,198,0.5)] transition-all duration-500 pointer-events-none z-20"
                    preserveAspectRatio="none"
                    viewBox="0 0 300 300" 
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M35 299.928V300H0V265H0.0722656L35 299.928ZM300 205V260H299.916L260 299.917V300H40V299.916L0.0830078 260H0V205L5 200V256.333L43.667 295H256.333L295 256.333V200L300 205ZM260 0.0839844L299.917 40H300V95L295 100V43.667L256.333 5H43.667L5 43.667V100L0 95V40H0.0839844L40 0.0830078V0H260V0.0839844ZM300 26V35H299.928L265 0.0722656V0H300V35Z" 
                      fill="currentColor"
                    />
                  </svg>

                  <div 
                    className="relative z-10 flex flex-col h-full bg-azul-petroleo/50 backdrop-blur-sm overflow-hidden"
                    style={{ 
                      clipPath: 'polygon(14.55% 1.66%, 85.44% 1.66%, 98.33% 14.55%, 98.33% 85.44%, 85.44% 98.33%, 14.55% 98.33%, 1.66% 85.44%, 1.66% 14.55%)' 
                    }}
                  >
                    
                    <div className="relative w-full h-[65%] shrink-0 bg-preto-espacial overflow-hidden border-b border-verde-agua/20">
                      <img 
                        src={game.image} 
                        alt={game.title} 
                        className={`relative z-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                          isDev ? 'grayscale opacity-50' : ''
                        }`} 
                      />

                      <div className="absolute inset-0 z-10 image-crt-scanlines opacity-70" />
                      <div className="absolute inset-0 z-10 image-crt-vignette" />
                      <div className="absolute inset-0 z-10 image-screen-glow" />

                      <div className="absolute inset-0 bg-preto-espacial/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-20">
                        <span className="font-sans font-bold px-5 py-2 border border-verde-agua text-verde-agua text-xs uppercase tracking-widest bg-preto-espacial/90 shadow-[0_0_10px_rgba(41,255,198,0.3)]">
                          Ver Detalhes
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col flex-1 justify-between pt-2 pb-5 px-8 relative">
                      
                      <div className="flex items-center gap-1.5 flex-wrap justify-start">
                        {isDev ? (
                          <span className="font-pixel px-2 py-0.5 bg-magenta-holografico/20 border border-magenta-holografico/40 text-magenta-holografico text-[10px] font-bold tracking-wider uppercase rounded shadow-[0_0_5px_rgba(217,70,239,0.2)]">
                            {isFeatured && "★ "}EM DESENVOLVIMENTO
                          </span>
                        ) : (
                          <span className="font-pixel px-2 py-0.5 bg-verde-agua/10 border border-verde-agua/40 text-verde-agua text-[10px] font-bold tracking-wider uppercase rounded shadow-[0_0_5px_rgba(41,255,198,0.2)]">
                            {isFeatured && "★ "}DISPONÍVEL
                          </span>
                        )}
                      </div>

                      <div className="flex-1 flex items-center justify-center text-center my-1">
                        <h3 className="font-sans font-bold text-branco-soft group-hover:text-verde-agua transition-colors drop-shadow-sm leading-tight text-base sm:text-lg md:text-xl line-clamp-2 px-1">
                          {game.title}
                        </h3>
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <GameModal
        isOpen={!!selectedGame}
        onClose={() => setSelectedGame(null)}
        game={selectedGame}
      />
    </>
  );
};

export default GameGrid;