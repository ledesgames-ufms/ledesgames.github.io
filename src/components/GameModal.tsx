import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, ChevronDown, Gamepad2, Play, Users, X, Calendar, ExternalLink, ShieldCheck, Terminal } from "lucide-react";
import { Game } from "@/data/Games";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const getYouTubeId = (url?: string | null) => {
  if (!url) return null;
  const match = url.match(
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,
  );
  return match?.[2]?.length === 11 ? match[2] : null;
};

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: Game | null;
}

const GameModal = ({ isOpen, onClose, game }: GameModalProps) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [showTeam, setShowTeam] = useState(true);

  useEffect(() => {
    setIsPlayingVideo(false);
    setShowTeam(true);
  }, [isOpen, game]);

  if (!game) return null;

  const videoId = getYouTubeId(game.videoUrl);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="h-[88vh] max-h-[850px] w-[calc(100vw-32px)] max-w-5xl overflow-hidden border-0 bg-transparent p-0 shadow-2xl [&>button]:hidden"
      >
        <DialogTitle className="sr-only">{game.title}</DialogTitle>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative flex h-full flex-col overflow-hidden bg-[#0A0A0E] border border-white/20 text-white shadow-2xl"
        >
          {/* Corner Crosshairs */}
          <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#0051ff] z-50" />
          <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#0051ff] z-50" />
          <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#0051ff] z-50" />
          <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#0051ff] z-50" />

          {/* Modal Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#0E0E14] border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#0051ff]" />
              <span className="font-mono text-xs text-white uppercase tracking-widest">
                FICHA TÉCNICA // LG-0{game.id}
              </span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="font-mono text-[10px] text-[#9999A5] uppercase hidden sm:inline">
                FACOM.UFMS ARCHIVE
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 border border-white/15 hover:border-white text-[#9999A5] hover:text-white transition-colors bg-white/[0.02]"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Modal Layout */}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
            
            {/* Left Media Stage */}
            <div className="relative shrink-0 min-h-[220px] h-[35vh] lg:h-full lg:w-[48%] overflow-hidden bg-black border-b lg:border-b-0 lg:border-r border-white/10">
              {isPlayingVideo && videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-black/30 to-transparent" />

                  {videoId && (
                    <button
                      onClick={() => setIsPlayingVideo(true)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-colors group z-20"
                    >
                      <div className="flex items-center gap-2 px-5 py-2.5 bg-[#0051ff] text-white font-cyber font-bold text-xs uppercase tracking-wider shadow-lg group-hover:scale-105 transition-transform">
                        <Play className="w-4 h-4 fill-current" />
                        <span>Assistir Gameplay</span>
                      </div>
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Right Information Scroll Area */}
            <div className="cyber-scroll flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#0E0E14]/40">
              <div className="space-y-6 p-6 lg:p-8">
                
                {/* Title & Category Tags */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-[#0051ff] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                      {game.released ? "LANÇADO" : "PROJETO ATIVO"}
                    </span>
                    {game.developmentDates?.start && (
                      <span className="font-mono text-[10px] text-[#9999A5] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#0051ff]" />
                        {game.developmentDates.start} {game.developmentDates.release ? `— ${game.developmentDates.release}` : ''}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-black text-3xl lg:text-4xl uppercase tracking-tight text-white leading-tight">
                    {game.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {game.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 border border-white/15 bg-white/[0.03] font-mono text-[10px] uppercase tracking-wider text-white/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-[#9999A5] uppercase tracking-wider block">
                    [ VISÃO GERAL & OBJETIVOS ]
                  </span>
                  <p className="text-sm sm:text-base font-sans text-[#D4D4D8] leading-relaxed">
                    {game.longDescription || game.description}
                  </p>
                </div>

                {/* Dev Team */}
                <div className="pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-[#9999A5] uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#0051ff]" /> CRÉDITOS & DESENVOLVIMENTO ({game.team?.length || 0})
                    </span>
                  </div>

                  {game.team && game.team.length > 0 ? (
                    <div className="bg-[#0A0A0E] border border-white/10 divide-y divide-white/5">
                      {game.team.map((member, idx) => (
                        <div
                          key={idx}
                          className="px-4 py-2.5 flex items-center justify-between gap-4 text-xs font-mono"
                        >
                          <span className="font-bold text-white">{member.name}</span>
                          <span className="text-[#0051ff] text-[11px] text-right">{member.role}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-mono text-xs text-[#9999A5] bg-white/[0.02] p-3 border border-white/5">
                      Equipe e créditos em atualização técnica.
                    </p>
                  )}
                </div>

              </div>

              {/* Action Bar Footer */}
              <div className="mt-auto shrink-0 border-t border-white/10 p-6 bg-[#0E0E14] flex flex-wrap gap-3">
                {game.playUrl ? (
                  <a
                    href={game.playUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-6 bg-[#0051ff] hover:bg-[#266eff] text-white font-cyber font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0051ff]/25 tech-cut-sm"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>Jogar no Itch.io</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div className="flex-1 py-3 px-6 border border-white/10 bg-white/[0.02] text-[#9999A5] font-cyber text-xs uppercase tracking-wider text-center">
                    Em Desenvolvimento
                  </div>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-6 border border-white/15 hover:border-white text-white font-cyber text-xs uppercase tracking-wider transition-colors"
                >
                  Fechar
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default GameModal;