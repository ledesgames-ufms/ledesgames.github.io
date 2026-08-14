import { useState, useEffect } from 'react';
import { Game } from '@/data/Games';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Users, ChevronDown, ChevronUp, Gamepad2, X } from 'lucide-react';
import { FrameHudCiberpunk } from '@/components/ui/framehud-cyberpunk';
import { useScrollColor } from '@/context/ScrollColorContext';

const getYouTubeId = (url: string | null | undefined) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: Game | null;
}

const GameModal = ({ isOpen, onClose, game }: GameModalProps) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const { theme } = useScrollColor();

  useEffect(() => {
    if (isOpen) {
      setIsPlayingVideo(false);
      setShowTeamDetails(false);
    }
  }, [isOpen, game]);

  if (!game) return null;

  const videoId = getYouTubeId(game.videoUrl);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl p-0 bg-transparent border-none shadow-none overflow-hidden [&>button]:hidden">
        <FrameHudCiberpunk>
          <div className="relative bg-[#07070B]/90 backdrop-blur-md p-6 sm:p-8 space-y-5 text-left max-h-[85vh] overflow-y-auto hud-scrollbar">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 rounded-full border bg-preto-espacial/80 hover:scale-110 transition-all"
              style={{ borderColor: `${theme.accent}66`, color: theme.accent }}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Mídia do Jogo */}
            <div 
              className="relative w-full h-[240px] sm:h-[320px] rounded-lg overflow-hidden border bg-azul-petroleo group mt-2"
              style={{ borderColor: `${theme.accent}44` }}
            >
              {isPlayingVideo && videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={game.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070B] via-transparent to-transparent opacity-80" />

                  {videoId && (
                    <button
                      onClick={() => setIsPlayingVideo(true)}
                      className="absolute inset-0 flex items-center justify-center bg-preto-espacial/30 hover:bg-preto-espacial/10 transition-colors"
                    >
                      <div
                        className="w-14 h-14 rounded-full text-preto-espacial flex items-center justify-center transition-transform hover:scale-110"
                        style={{ backgroundColor: theme.accent }}
                      >
                        <Play className="w-7 h-7 fill-current ml-1" />
                      </div>
                    </button>
                  )}
                </>
              )}

              <div className="absolute top-4 left-4 z-10 flex gap-2">
                {!game.released ? (
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
                {game.developmentDates?.release && game.developmentDates.release !== 'A definir' && (
                  <Badge
                    variant="outline"
                    className="bg-[#07070B]/80 font-cyber border"
                    style={{ borderColor: `${theme.accent}66`, color: theme.accent }}
                  >
                    {game.developmentDates.release}
                  </Badge>
                )}
              </div>
            </div>

            {/* Título e Tags */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-syne font-extrabold text-branco-soft mb-2">
                {game.title}
              </h3>
              {game.tags && game.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-cyber border rounded transition-colors duration-1000"
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

            {/* Descrição */}
            <p className="text-cinza-futurista font-sans text-sm sm:text-base leading-relaxed">
              {game.longDescription || game.description}
            </p>

            {/* Detalhes da Equipe */}
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
                  {game.team && game.team.length > 0 ? (
                    game.team.map((member, idx) => (
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

            {/* Botão de Ação */}
            <div className="pt-2">
              {game.playUrl ? (
                <a
                  href={game.playUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-2 px-8 py-3 text-preto-espacial font-cyber font-bold rounded transition-colors duration-1000 hover:brightness-110"
                  style={{ backgroundColor: theme.accent }}
                >
                  <Gamepad2 className="w-5 h-5" /> JOGAR AGORA
                </a>
              ) : (
                <Button disabled className="w-full bg-transparent border text-cinza-futurista font-cyber" style={{ borderColor: `${theme.accent}44` }}>
                  EM DESENVOLVIMENTO
                </Button>
              )}
            </div>

          </div>
        </FrameHudCiberpunk>
      </DialogContent>
    </Dialog>
  );
};

export default GameModal;