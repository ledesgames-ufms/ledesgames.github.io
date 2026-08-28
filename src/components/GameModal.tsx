import { type CSSProperties, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, ChevronDown, Gamepad2, Play, Users, X } from "lucide-react";
import { Game } from "@/data/Games";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useScrollColor } from "@/context/ScrollColorContext";

const getYouTubeId = (url?: string | null) => {
  if (!url) return null;
  const match = url.match(
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,
  );
  return match?.[2]?.length === 11 ? match[2] : null;
};

// SVG 2 Seguro
const getFrameSvgUri = (color: string) => {
  const safeColor = color.replace(/[^#(),.%a-zA-Z0-9 ]/g, "");
  const svg = `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 299.928V300H0V265H0.0722656L35 299.928ZM300 205V260H299.916L260 299.917V300H40V299.916L0.0830078 260H0V205L5 200V256.333L43.667 295H256.333L295 256.333V200L300 205ZM260 0.0839844L299.917 40H300V95L295 100V43.667L256.333 5H43.667L5 43.667V100L0 95V40H0.0839844L40 0.0830078V0H260V0.0839844ZM300 26V35H299.928L265 0.0722656V0H274L300 26ZM300 21.0508L278.949 0H300V21.0508Z" fill="${safeColor}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: Game | null;
}

const GameModal = ({ isOpen, onClose, game }: GameModalProps) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const { theme } = useScrollColor();

  useEffect(() => {
    setIsPlayingVideo(false);
    setShowTeam(false);
  }, [isOpen, game]);

  if (!game) return null;

  const videoId = getYouTubeId(game.videoUrl);
  const modalStyle = { "--accent": theme.accent } as CSSProperties;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        style={modalStyle}
        className="h-[80vh] min-h-[500px] w-[calc(100vw-24px)] max-w-6xl overflow-hidden border-0 bg-transparent p-0 shadow-none [&>button]:hidden"
      >
        <DialogTitle className="sr-only">{game.title}</DialogTitle>
        <style>{`
          .cyber-modal-scroll::-webkit-scrollbar { width: 4px; }
          .cyber-modal-scroll { scrollbar-width: thin; scrollbar-color: color-mix(in srgb, var(--accent) 55%, transparent) transparent; }
          .cyber-modal-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,.03); }
          .cyber-modal-scroll::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--accent) 55%, transparent); border-radius: 4px; }
          .cyber-modal-scroll::-webkit-scrollbar-thumb:hover { background: var(--accent); }
        `}</style>

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative flex h-full flex-col overflow-hidden bg-[#0A0D18]/95 backdrop-blur-xl transition-colors duration-1000 shadow-[0_0_60px_rgba(0,0,0,.8)]"
          style={{
            borderStyle: "solid",
            borderWidth: "32px",
            borderImageSource: getFrameSvgUri(theme.accent),
            borderImageSlice: "38 fill", 
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-50 grid h-10 w-10 place-items-center rounded bg-[#07070B]/90 border border-[var(--accent)]/30 text-[var(--accent)] backdrop-blur-md transition hover:bg-[var(--accent)] hover:text-[#07070B]"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
            
            <div className="relative shrink-0 min-h-[240px] h-[35vh] lg:h-full lg:w-[50%] overflow-hidden border-b border-white/10 bg-[#07070B] lg:border-b-0 lg:border-r" style={{ borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' }}>
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
                    alt=""
                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-xl"
                  />
                  <div className="relative flex h-full w-full items-center justify-center p-6">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="max-h-full max-w-full object-contain drop-shadow-2xl"
                    />
                  </div>
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A0D18] via-transparent to-transparent opacity-80" />

                  {videoId && (
                     <button
                       onClick={() => setIsPlayingVideo(true)}
                       className="absolute inset-0 flex items-center justify-center bg-[#07070B]/30 transition-colors hover:bg-[#07070B]/10 z-20"
                     >
                       <div className="grid h-16 w-16 place-items-center rounded-full bg-[var(--accent)] text-[#07070B] shadow-[0_0_15px_color-mix(in_srgb,var(--accent)_50%,transparent)] transition-transform hover:scale-105">
                         <Play className="ml-1 h-7 w-7 fill-current" />
                       </div>
                     </button>
                  )}
                </>
              )}
            </div>

            <div className="cyber-modal-scroll flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#0A0D18]/30">
              <div className="space-y-5 p-6 lg:p-10">
                <div>
                  <h3 className="mb-3 font-syne text-4xl lg:text-5xl font-extrabold uppercase leading-[.95] tracking-tight text-[#F4F7FF] drop-shadow-lg">
                    {game.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {game.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border bg-[#0B1020] px-2.5 py-1 font-cyber text-[9px] uppercase tracking-widest text-[#94A3B8]"
                        style={{ borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="whitespace-pre-line text-base leading-7 text-[#94A3B8]">
                  {game.longDescription || game.description}
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => setShowTeam(!showTeam)}
                    className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-[#07070B]/60 p-4 font-syne text-xs font-bold uppercase text-[#F4F7FF] transition hover:border-[var(--accent)]/50"
                  >
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[var(--accent)]" /> Equipe de
                      desenvolvimento
                    </span>
                    {showTeam ? (
                      <ChevronUp className="h-4 w-4 text-[var(--accent)]" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[var(--accent)]" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {showTeam && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 space-y-2 rounded-lg border border-white/10 bg-[#07070B]/60 p-5">
                          {game.team?.length ? (
                            game.team.map((member) => (
                              <div
                                key={`${member.name}-${member.role}`}
                                className="flex justify-between gap-4 border-b border-white/5 pb-3 text-sm last:border-0 last:pb-0"
                              >
                                <span className="font-bold text-[#F4F7FF]">
                                  {member.name}
                                </span>
                                <span className="font-cyber text-[10px] uppercase tracking-wider text-[var(--accent)]">
                                  {member.role}
                                </span>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-[#94A3B8]">
                              Créditos em atualização.
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-auto shrink-0 border-t p-6 pt-5 bg-[#07070B]/40" style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
                {game.playUrl ? (
                  <a
                    href={game.playUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] font-cyber text-[13px] font-bold uppercase tracking-[0.1em] text-[#07070B] transition hover:brightness-110 shadow-[0_0_15px_color-mix(in_srgb,var(--accent)_30%,transparent)]"
                  >
                    <Gamepad2 className="h-5 w-5" /> Iniciar jogo
                  </a>
                ) : (
                  <div className="flex h-14 items-center justify-center rounded-lg border border-white/10 bg-white/[.02] font-cyber text-[12px] uppercase tracking-[0.1em] text-[#94A3B8]">
                    Em desenvolvimento
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default GameModal;