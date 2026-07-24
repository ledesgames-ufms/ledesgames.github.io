import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, X,Calendar, Users, ChevronDown, ChevronUp, Gamepad2 } from 'lucide-react';
import { Game } from '@/data/Games';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: Game | null;
}

const getYouTubeId = (url: string | undefined) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const GameModal = ({ isOpen, onClose, game }: GameModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setShowDetails(false);
  }, [isOpen, game]);

  if (!game) return null;

  const videoId = getYouTubeId(game.videoUrl);
  const gameLink = game.playUrl || "https://itch.io/profile/ledesgames";
  const isDev = game.released === false;
  const isFeatured = game.isFeatured === true;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      
      <style>{`
        /* Moldura HUD SVG minimalista */
        .modal-hud-border {
          border: 52px solid transparent;
          border-image-source: url("data:image/svg+xml;charset=utf-8,%3Csvg width='300' height='300' viewBox='0 0 300 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M35 299.928V300H0V265H0.0722656L35 299.928ZM300 205V260H299.916L260 299.917V300H40V299.916L0.0830078 260H0V205L5 200V256.333L43.667 295H256.333L295 256.333V200L300 205ZM300 300H265V299.928L299.928 265H300V300ZM260 0.0839844L299.917 40H300V95L295 100V43.667L256.333 5H43.667L5 43.667V100L0 95V40H0.0839844L40 0.0830078V0H260V0.0839844ZM35 0.0722656L0.0722656 35H0V0H35V0.0722656ZM300 35H299.928L265 0.0722656V0H300V35Z' fill='%2329FFC6'/%3E%3C/svg%3E");
          border-image-slice: 52;
          border-image-repeat: stretch;
          pointer-events: none;
          filter: drop-shadow(0 0 10px rgba(41, 255, 198, 0.4));
        }

        /* Scrollbar estilizada Cyberpunk */
        .modal-scroll::-webkit-scrollbar { width: 6px; }
        .modal-scroll::-webkit-scrollbar-track { background: rgba(7, 7, 11, 0.8); }
        .modal-scroll::-webkit-scrollbar-thumb { background-color: rgba(41, 255, 198, 0.3); }
        .modal-scroll::-webkit-scrollbar-thumb:hover { background-color: rgba(41, 255, 198, 0.8); }
        
        /* Estilização do botão 'X' de fechar */
        button[aria-label="Close"] {
          color: #29FFC6;
          background-color: rgba(7, 7, 11, 0.9);
          border: 1px solid #29FFC6;
          opacity: 1;
          box-shadow: 0 0 10px rgba(41, 255, 198, 0.2);
          transition: all 0.3s ease;
          z-index: 50;
        }
        button[aria-label="Close"]:hover {
          background-color: #29FFC6;
          color: #07070B;
          box-shadow: 0 0 15px rgba(41, 255, 198, 0.6);
        }
      `}</style>

      <DialogContent className="max-w-5xl p-0 border-none bg-transparent shadow-none sm:rounded-none h-[80vh] md:h-[75vh] flex flex-col focus:outline-none overflow-visible">
        <DialogHeader className="sr-only">
          <DialogTitle>{game.title}</DialogTitle>
        </DialogHeader>

        <div className="modal-hud-border absolute inset-0 z-30 pointer-events-none" />

        <div 
          className="relative z-10 flex flex-col md:flex-row h-full w-full bg-preto-espacial/95 backdrop-blur-md overflow-hidden"
          style={{
            clipPath: 'polygon(44px 5px, calc(100% - 44px) 5px, calc(100% - 5px) 44px, calc(100% - 5px) calc(100% - 44px), calc(100% - 44px) calc(100% - 5px), 44px calc(100% - 5px), 5px calc(100% - 44px), 5px 44px)'
          }}
        >
          
          <div className="w-full md:w-1/2 bg-azul-petroleo/30 p-6 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-verde-agua/20 overflow-y-auto modal-scroll">
            
            <div className="relative aspect-video overflow-hidden bg-black mb-6 border border-verde-agua/30 shadow-[0_0_15px_rgba(41,255,198,0.1)] shrink-0">
              {isPlaying && videoId ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 z-20"
                ></iframe>
              ) : (
                <>
                  <img
                    src={game.image}
                    alt={game.title}
                    className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${isDev ? 'grayscale opacity-60' : ''}`}
                  />
                  {/* Filtro CRT */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_3px] opacity-70 pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />

                  {videoId && (
                    <div className="absolute inset-0 flex items-center justify-center bg-preto-espacial/40 backdrop-blur-sm transition-opacity hover:bg-preto-espacial/20 z-10">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="w-16 h-16 rounded-full bg-verde-agua text-preto-espacial hover:bg-branco-soft transition-transform hover:scale-110 shadow-[0_0_20px_rgba(41,255,198,0.5)] cursor-pointer"
                        onClick={() => setIsPlaying(true)}
                      >
                        <Play className="w-8 h-8 ml-1" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="space-y-4 font-sans text-branco-soft">
              <div>
                <p className="text-sm text-cinza-futurista mb-1">Status</p>
                <div className="flex items-center gap-2">
                  {isDev ? (
                    <span className="font-pixel px-3 py-1 bg-magenta-holografico/20 border border-magenta-holografico/50 text-magenta-holografico text-xs font-bold tracking-wider uppercase">
                      {isFeatured && "★ "}EM DESENVOLVIMENTO
                    </span>
                  ) : (
                    <span className="font-pixel px-3 py-1 bg-verde-agua/10 border border-verde-agua/50 text-verde-agua text-xs font-bold tracking-wider uppercase">
                      {isFeatured && "★ "}DISPONÍVEL
                    </span>
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-cinza-futurista mb-1">Lançamento</p>
                <div className="flex items-center gap-2 text-verde-agua">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">
                    {game.developmentDates?.release || 'A definir'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto modal-scroll">
            
            <h2 className="text-3xl md:text-4xl font-syne font-bold text-branco-soft mb-6 tracking-wide drop-shadow-sm">
              {game.title}
            </h2>

            <div className="flex flex-wrap gap-2 mb-8">
              {game.tags.map(tag => (
                <span key={tag} className="font-pixel px-2 py-1 bg-azul-petroleo border border-verde-agua/20 text-verde-agua text-xs font-medium rounded">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {game.playUrl && !isDev && (
                <Button 
                  className="flex-1 bg-verde-agua/10 border border-verde-agua text-verde-agua hover:bg-verde-agua hover:text-preto-espacial font-sans font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_10px_rgba(41,255,198,0.1)] hover:shadow-[0_0_20px_rgba(41,255,198,0.5)] cursor-pointer"
                  onClick={() => window.open(game.playUrl, '_blank')}
                >
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  Jogar Agora
                </Button>
              )}
            </div>

            <div className="prose prose-invert max-w-none mb-8">
              <h3 className="text-lg font-bold text-verde-agua mb-2 font-syne">Sobre o Jogo</h3>
              <p className="text-cinza-futurista leading-relaxed font-sans text-sm md:text-base">
                {game.description}
              </p>
            </div>

            <div className="border-t border-verde-agua/20 pt-6">
              <Button
                variant="outline"
                className="w-full flex justify-between items-center py-6 bg-azul-petroleo/30 border-verde-agua/30 text-branco-soft hover:bg-azul-petroleo hover:text-verde-agua transition-colors cursor-pointer"
                onClick={() => setShowDetails(!showDetails)}
              >
                <span className="font-bold text-lg font-syne flex items-center gap-2">
                  <Users className="w-5 h-5 text-verde-agua" />
                  Equipe de Desenvolvimento
                </span>
                {showDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </Button>

              {showDetails && (
                <div className="mt-4 bg-preto-espacial/80 border border-verde-agua/20 p-6 shadow-inner font-sans">
                  {game.team && game.team.length > 0 ? (
                    <ul className="space-y-3">
                      {game.team.map((member, index) => (
                        <li key={index} className="flex flex-col sm:flex-row sm:justify-between text-sm border-b border-verde-agua/10 pb-2 last:border-0 last:pb-0">
                          <span className="font-bold text-branco-soft">{member.name}</span>
                          <span className="text-verde-agua/80 italic text-left sm:text-right mt-1 sm:mt-0">{member.role}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-cinza-futurista italic">Informação de equipe não disponível.</p>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameModal;