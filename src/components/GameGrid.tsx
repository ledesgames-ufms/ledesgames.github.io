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
      <section id="games" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Nossos Games</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {games.map((game, index) => {
              const isDev = game.released === false;

              return (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedGame(game)}
                  className="group cursor-pointer h-full"
                >
                  <div className="bg-card border border-border overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 h-full flex flex-col relative">
                    
                    {/* Container da Imagem */}
                    <div className="relative aspect-square overflow-hidden shrink-0">
                      <img 
                        src={game.image} 
                        alt={game.title} 
                        // Escala de cinza e redução de opacidade
                        className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                          isDev ? 'grayscale opacity-60' : ''
                        }`} 
                      />

                      {/* Overlay pros jogos Em Desenvolvimento */}
                      {isDev && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/1 backdrop-blur-[1px] z-10">
                          <div className="flex flex-col items-center gap-4">
                            <img 
                              src={loadingCapibaraGif} 
                              alt="Carregando..."
                              className="w-20 h-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                            />
                            
                            <span className="text-lg font-extrabold tracking-wider uppercase text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                              Em Desenvolvimento
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {game.title}
                      </h3>
                      <p className="text-foreground/70 text-sm mb-4 flex-1">
                        {game.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {game.tags.slice(0, 4).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-muted text-xs font-medium">
                            {tag}
                          </span>
                        ))}
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