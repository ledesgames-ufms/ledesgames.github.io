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
import { Play, X, Calendar, Users, ChevronDown, ChevronUp, Gamepad2 } from 'lucide-react';
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-card border-border w-full transition-all duration-300 p-0 [&>button]:hidden">

        <div className="absolute right-1 top-1 z-50">
          <DialogClose className="rounded-full p-2 text-foreground/50 hover:text-foreground transition-colors focus:outline-none">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <div className="px-6 pb-4 pt-8 md:px-8 md:pb-8 md:pt-12">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Informações */}
            <div className="flex flex-col justify-center">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold mb-4">{game.title}</DialogTitle>
              </DialogHeader>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {game.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-primary/30 text-primary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Descrições */}
              <p className="text-foreground/80 mb-4 leading-relaxed">{game.description}</p>
              <p className="text-foreground/60 mb-6 leading-relaxed text-sm">{game.longDescription}</p>

              {/* Botões */}
              <div className="flex gap-3 mt-auto flex-wrap">
                {isDev ? (
                  <Button className="gap-2 cursor-not-allowed opacity-80" disabled>
                    <Gamepad2 className="w-4 h-4" />
                    Em Breve
                  </Button>
                ) : (
                  <Button className="gap-2" asChild>
                    <a href={gameLink} target="_blank" rel="noopener noreferrer">
                      <Gamepad2 className="w-4 h-4" />
                      Jogar Agora
                    </a>  
                  </Button>
                )}

                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {showDetails ? "Menos Detalhes" : "Saiba Mais"}
                </Button>
              </div>
            </div>

            {/* Capa e Vídeo */}
            <div className="relative aspect-video bg-muted rounded-md overflow-hidden self-start w-full shadow-sm border border-border/50">
              {isPlaying && videoId ? (
                <div className="relative w-full h-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                  {/* Botão para fechar o trailer e voltar pra capa */}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-2 right-2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8 backdrop-blur-sm"
                    onClick={() => setIsPlaying(false)}
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">Fechar Trailer</span>
                  </Button>
                </div>
              ) : (
                <>
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                  {videoId && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group hover:bg-black/30 transition-colors">
                      <Button 
                        size="lg" 
                        variant="secondary" 
                        className="gap-2 shadow-lg hover:scale-105 transition-transform"
                        onClick={() => setIsPlaying(true)}
                      >
                        <Play className="w-6 h-6" />
                        Ver Trailer
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Detalhes Extras */}
          {showDetails && (
            <div className="mt-8 pt-6 border-t border-border animate-in slide-in-from-top-4 fade-in duration-300">
              <div className="flex flex-col gap-6">
                
                {/* Cronograma */}
                <div>
                  <div className="flex items-center gap-2 mb-3 text-primary">
                    <Calendar className="w-5 h-5" />
                    <h3 className="font-bold text-lg">Cronograma</h3>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-md flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-8">
                    <div className="flex justify-between md:justify-start w-full md:w-auto items-center gap-3">
                      <span className="text-foreground/70 text-sm">Início do Desenvolvimento:</span>
                      <span className="font-medium">{game.developmentDates?.start || "N/A"}</span>
                    </div>
                    
                    <div className="hidden md:block h-4 w-px bg-border/50"></div>

                    <div className="flex justify-between md:justify-start w-full md:w-auto items-center gap-3">
                      <span className="text-foreground/70 text-sm">Data de Lançamento:</span>
                      <span className="font-medium">{game.developmentDates?.release || "Em breve"}</span>
                    </div>
                  </div>
                </div>

                {/* Equipe de Desenvolvimento */}
                <div>
                  <div className="flex items-center gap-2 mb-3 text-primary">
                    <Users className="w-5 h-5" />
                    <h3 className="font-bold text-lg">Equipe de Desenvolvimento</h3>
                  </div>
                  
                  <div className="bg-muted/50 p-6 rounded-md">
                    {game.team && game.team.length > 0 ? (
                      <div className="pr-2">
                        <ul className="space-y-3">
                          {game.team.map((member, index) => (
                            <li key={index} className="flex flex-col sm:flex-row sm:justify-between text-sm border-b border-border/30 pb-2 last:border-0 last:pb-0">
                              <span className="font-semibold text-foreground">{member.name}</span>
                              <span className="text-foreground/60 italic text-right">{member.role}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-sm text-foreground/60 italic">Informação de equipe não disponível.</p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameModal;