import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { games, Game } from '@/data/Games';
import {
  LayoutGrid,
  PanelRight,
  Play,
  Users,
  ChevronDown,
  ChevronUp,
  Gamepad2,
  Radio,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import GameModal from './GameModal';
import GamesHudGrid from '@/components/ui/gameshud-grid';
import ConsoleFrame from '@/components/ui/console-frame';
import { useScrollColor } from '@/context/ScrollColorContext';

const getYouTubeId = (url: string | null | undefined) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const GameGrid = () => {
  const [selectedGame, setSelectedGame] = useState<Game>(() => {
    return games.find((g) => g.isFeatured) || games[0] || {} as Game;
  });

  const [viewMode, setViewMode] = useState<'split' | 'grid'>('split');
  const [modalGame, setModalGame] = useState<Game | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [showTeamDetails, setShowTeamDetails] = useState(false);

  useEffect(() => {
    setIsPlayingVideo(false);
    setShowTeamDetails(false);
  }, [selectedGame]);

  const handleCardClick = (game: Game) => {
    if (!game) return;
    setSelectedGame(game);
    if (window.innerWidth < 1024 || viewMode === 'grid') {
      setModalGame(game);
    }
  };

  const videoId = getYouTubeId(selectedGame?.videoUrl);
  const { theme } = useScrollColor();

  return (
    <>
      <section id="games" className="relative py-24 overflow-hidden bg-transparent">
        <GamesHudGrid />

        <style>{`
          .hud-scrollbar::-webkit-scrollbar { width: 5px; }
          .hud-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .hud-scrollbar::-webkit-scrollbar-thumb { background: ${theme.accent}66; border-radius: 4px; }
          .hud-scrollbar::-webkit-scrollbar-thumb:hover { background: ${theme.accent}; }
        `}</style>

        <div className="container mx-auto px-4 relative z-20">
          <ConsoleFrame className={viewMode === 'split' ? 'lg:h-[860px]' : 'h-auto min-h-[600px]'}>
            
            {/* --- HEADER DO CONSOLE --- */}
            <div
              className="shrink-0 flex flex-col md:flex-row md:items-end justify-between pb-4 border-b gap-4 transition-colors duration-1000"
              style={{ borderColor: `${theme.accent}33` }}
            >
              <div>
                <h2 className="text-3xl md:text-5xl font-syne font-extrabold text-branco-soft tracking-tight">
                  NOSSOS <span className="transition-colors duration-1000" style={{ color: theme.accent }}>JOGOS</span>
                </h2>
              </div>

              {/* BOTÕES DE MODO */}
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="text-xs font-cyber text-cinza-futurista uppercase tracking-wider hidden sm:inline">
                  VISUALIZAÇÃO:
                </span>
                <div
                  className="flex items-center gap-1 p-1 bg-preto-espacial/80 border rounded-lg transition-colors duration-1000"
                  style={{ borderColor: `${theme.accent}55` }}
                >
                  <button
                    onClick={() => setViewMode('split')}
                    title="Modo Painel HUD Dividido"
                    className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-cyber transition-all"
                    style={
                      viewMode === 'split'
                        ? { backgroundColor: theme.accent, color: '#07070B', fontWeight: 'bold' }
                        : { color: '#94A3B8' }
                    }
                  >
                    <PanelRight className="w-4 h-4" />
                    <span className="hidden sm:inline">HUD SPLIT</span>
                  </button>

                  <button
                    onClick={() => setViewMode('grid')}
                    title="Expandir para Lista Completa"
                    className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-cyber transition-all"
                    style={
                      viewMode === 'grid'
                        ? { backgroundColor: theme.accent, color: '#07070B', fontWeight: 'bold' }
                        : { color: '#94A3B8' }
                    }
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span className="hidden sm:inline">LISTA</span>
                  </button>
                </div>
              </div>
            </div>

            {/* --- CORPO DA SEÇÃO DE JOGOS --- */}
            <div className="flex-1 flex flex-col lg:flex-row min-h-0 relative z-20 pt-6">
              
              {/* LADO ESQUERDO: LISTA DE JOGOS */}
              <div
                className={`w-full flex flex-col min-h-0 transition-all duration-500 ${
                  viewMode === 'split' 
                    ? 'lg:w-2/5 xl:w-1/3 lg:border-r pr-0 lg:pr-5' 
                    : 'w-full'
                }`}
                style={{ borderColor: `${theme.accent}22` }}
              >
                <div
                  className={`flex-1 overflow-y-auto hud-scrollbar ${
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-2 pb-2'
                      : 'flex flex-col gap-3 pr-2 pb-2'
                  }`}
                >
                  {games.map((game) => {
                    const isSelected = selectedGame?.id === game.id && viewMode === 'split';

                    return (
                      <motion.div
                        key={game.id}
                        onClick={() => handleCardClick(game)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative cursor-pointer group transition-all duration-300 rounded overflow-hidden border ${
                          viewMode === 'grid' ? 'flex flex-col bg-[#07070B]/80' : 'flex items-center gap-3 p-2 bg-[#07070B]/40'
                        }`}
                        style={
                          isSelected
                            ? { borderColor: theme.accent, backgroundColor: `${theme.accent}20` }
                            : { borderColor: `${theme.accent}33` }
                        }
                      >
                        {isSelected && (
                          <div
                            className="absolute left-0 top-0 bottom-0 w-1 transition-colors duration-1000 z-10"
                            style={{ backgroundColor: theme.accent }}
                          />
                        )}

                        <div
                          className={`relative overflow-hidden shrink-0 ${
                            viewMode === 'grid' ? 'w-full h-44 border-b' : 'w-24 h-16 rounded border'
                          }`}
                          style={{ borderColor: `${theme.accent}33` }}
                        >
                          <img
                            src={game.image}
                            alt={game.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-preto-espacial via-transparent to-transparent opacity-60" />

                          {game.isFeatured && (
                            <span className="absolute top-1 right-1 px-1.5 py-0.5 bg-[#FFD600] text-preto-espacial text-[9px] font-pixel rounded font-bold uppercase tracking-wider">
                              ★
                            </span>
                          )}
                        </div>

                        <div className={`min-w-0 flex-1 ${viewMode === 'grid' ? 'p-4' : ''}`}>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            {!game.released ? (
                              <span className="font-pixel text-[9px] px-1.5 py-0.5 bg-[#FFD600]/15 border border-[#FFD600]/50 text-[#FFD600] rounded">
                                DEV
                              </span>
                            ) : (
                              <span
                                className="font-pixel text-[9px] px-1.5 py-0.5 border rounded"
                                style={{
                                  backgroundColor: `${theme.accent}15`,
                                  borderColor: `${theme.accent}55`,
                                  color: theme.accent,
                                }}
                              >
                                PRONTO
                              </span>
                            )}
                          </div>
                          <h3
                            className={`font-syne font-bold truncate transition-colors ${
                              viewMode === 'grid' ? 'text-lg' : 'text-base'
                            }`}
                            style={{ color: isSelected ? theme.accent : '#F4F7FF' }}
                          >
                            {game.title}
                          </h3>
                        </div>

                        {viewMode === 'split' && (
                          <span
                            className="text-lg font-bold font-cyber shrink-0 pr-3 transition-all"
                            style={{ color: isSelected ? theme.accent : 'transparent' }}
                          >
                            ▸
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* LADO DIREITO: DESTAQUE HUD SPLIT */}
              {viewMode === 'split' && (
                <div className="hidden lg:flex flex-col lg:w-3/5 xl:w-2/3 min-h-0 pl-0 lg:pl-6">
                  <AnimatePresence mode="wait">
                    {selectedGame?.id && (
                      <motion.div
                        key={selectedGame.id}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col w-full h-full min-h-0 bg-[#07070B]/50 border rounded-lg overflow-hidden"
                        style={{ borderColor: `${theme.accent}33` }}
                      >
                        <div
                          className="shrink-0 h-[320px] xl:h-[400px] relative border-b bg-azul-petroleo group"
                          style={{ borderColor: `${theme.accent}22` }}
                        >
                          {isPlayingVideo && videoId ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                              title={selectedGame.title}
                              className="w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <>
                              <img
                                src={selectedGame.image}
                                alt={selectedGame.title}
                                className="w-full h-full object-cover opacity-80"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#07070B] via-transparent to-transparent opacity-90" />

                              {videoId && (
                                <button
                                  onClick={() => setIsPlayingVideo(true)}
                                  className="absolute inset-0 flex items-center justify-center bg-preto-espacial/20 hover:bg-preto-espacial/10 transition-all"
                                >
                                  <div
                                    className="w-16 h-16 rounded-full text-preto-espacial flex items-center justify-center transition-transform duration-500 hover:scale-110"
                                    style={{ backgroundColor: theme.accent }}
                                  >
                                    <Play className="w-8 h-8 fill-current ml-1" />
                                  </div>
                                </button>
                              )}
                            </>
                          )}

                          <div className="absolute top-4 left-4 z-10 flex gap-2">
                            {!selectedGame.released ? (
                              <Badge className="bg-[#FFD600] text-preto-espacial font-bold border-0 font-pixel">
                                EM DESENVOLVIMENTO
                              </Badge>
                            ) : (
                              <Badge
                                className="text-preto-espacial font-bold border-0 font-pixel transition-colors duration-1000"
                                style={{ backgroundColor: theme.accent }}
                              >
                                DISPONÍVEL
                              </Badge>
                            )}
                            {selectedGame.developmentDates?.release && selectedGame.developmentDates.release !== 'A definir' && (
                              <Badge
                                variant="outline"
                                className="bg-[#07070B]/80 font-cyber border"
                                style={{ borderColor: `${theme.accent}66`, color: theme.accent }}
                              >
                                Lançamento: {selectedGame.developmentDates.release}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 hud-scrollbar space-y-5">
                          <div>
                            <h3 className="text-3xl font-syne font-extrabold text-branco-soft mb-3">
                              {selectedGame.title}
                            </h3>
                            {selectedGame.tags && selectedGame.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {selectedGame.tags.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2.5 py-1 text-[10px] font-cyber border rounded transition-colors duration-1000"
                                    style={{
                                      borderColor: `${theme.accent}55`,
                                      color: theme.accent,
                                      backgroundColor: `${theme.accent}05`,
                                    }}
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <p className="text-cinza-futurista font-sans text-base leading-relaxed">
                            {selectedGame.longDescription || selectedGame.description}
                          </p>

                          <div>
                            <button
                              onClick={() => setShowTeamDetails(!showTeamDetails)}
                              className="w-full flex items-center justify-between p-3 border rounded transition-colors duration-1000 text-left"
                              style={{
                                borderColor: `${theme.accent}44`,
                                backgroundColor: showTeamDetails ? `${theme.accent}15` : 'transparent',
                              }}
                            >
                              <span className="font-syne font-bold text-sm text-branco-soft flex items-center gap-2">
                                <Users className="w-4 h-4 transition-colors duration-1000" style={{ color: theme.accent }} />
                                EQUIPE DE DESENVOLVIMENTO
                              </span>
                              {showTeamDetails ? (
                                <ChevronUp className="w-4 h-4" style={{ color: theme.accent }} />
                              ) : (
                                <ChevronDown className="w-4 h-4" style={{ color: theme.accent }} />
                              )}
                            </button>

                            {showTeamDetails && (
                              <div
                                className="mt-2 p-4 border rounded space-y-2 bg-[#07070B]/80 max-h-40 overflow-y-auto hud-scrollbar"
                                style={{ borderColor: `${theme.accent}33` }}
                              >
                                {selectedGame.team && selectedGame.team.length > 0 ? (
                                  selectedGame.team.map((member, idx) => (
                                    <div
                                      key={idx}
                                      className="flex justify-between text-xs border-b pb-1.5 last:border-0 last:pb-0 pr-2"
                                      style={{ borderColor: `${theme.accent}15` }}
                                    >
                                      <span className="text-branco-soft font-bold">{member.name}</span>
                                      <span className="italic font-cyber transition-colors duration-1000" style={{ color: theme.accent }}>
                                        {member.role}
                                      </span>
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-xs text-cinza-futurista italic">Informações da equipe em atualização.</p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div
                          className="shrink-0 p-5 border-t bg-[#07070B]"
                          style={{ borderColor: `${theme.accent}22` }}
                        >
                          {selectedGame.playUrl ? (
                            <a
                              href={selectedGame.playUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-8 py-3 text-preto-espacial font-cyber font-bold rounded transition-colors duration-1000 hover:brightness-110"
                              style={{ backgroundColor: theme.accent }}
                            >
                              <Gamepad2 className="w-5 h-5" /> JOGAR AGORA
                            </a>
                          ) : (
                            <Button disabled className="bg-transparent border text-cinza-futurista font-cyber" style={{ borderColor: `${theme.accent}44` }}>
                              EM DESENVOLVIMENTO
                            </Button>
                          )}
                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

            </div>
          </ConsoleFrame>
        </div>
      </section>

      <GameModal isOpen={!!modalGame} onClose={() => setModalGame(null)} game={modalGame} />
    </>
  );
};

export default GameGrid;