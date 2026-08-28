import { type CSSProperties, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Gamepad2,
  Grid3X3,
  Play,
  Rows3,
  Users,
  Radio
} from "lucide-react";
import { games, Game } from "@/data/Games";
import GameModal from "./GameModal";
import { GamesHudGrid } from "@/components/ui/gameshud-grid";
import { useScrollColor } from "@/context/ScrollColorContext";

const getYouTubeId = (url?: string | null) => {
  if (!url) return null;
  const match = url.match(
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,
  );
  return match?.[2]?.length === 11 ? match[2] : null;
};

const getFrameSvgUri = (color: string) => {
  const safeColor = color.replace(/[^#(),.%a-zA-Z0-9 ]/g, "");
  const svg = `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 299.928V300H0V265H0.0722656L35 299.928ZM300 205V260H299.916L260 299.917V300H40V299.916L0.0830078 260H0V205L5 200V256.333L43.667 295H256.333L295 256.333V200L300 205ZM260 0.0839844L299.917 40H300V95L295 100V43.667L256.333 5H43.667L5 43.667V100L0 95V40H0.0839844L40 0.0830078V0H260V0.0839844ZM300 26V35H299.928L265 0.0722656V0H274L300 26ZM300 21.0508L278.949 0H300V21.0508Z" fill="${safeColor}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

const GameGrid = () => {
  const [selectedGame, setSelectedGame] = useState<Game>(
    () => games.find((game) => game.isFeatured) ?? games[0],
  );
  const [viewMode, setViewMode] = useState<"console" | "matrix">("console");
  const [modalGame, setModalGame] = useState<Game | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const { theme } = useScrollColor();

  useEffect(() => {
    setIsPlayingVideo(false);
    setShowTeam(false);
  }, [selectedGame]);

  const openGame = (game: Game) => {
    setSelectedGame(game);
    if (window.innerWidth < 1024 || viewMode === "matrix") setModalGame(game);
  };

  const selectedIndex = useMemo(
    () => Math.max(0, games.findIndex((game) => game.id === selectedGame.id)),
    [selectedGame]
  );

  const videoId = getYouTubeId(selectedGame.videoUrl);
  const sectionStyle = { "--accent": theme.accent } as CSSProperties;

  return (
    <>
      <section
        id="games"
        style={sectionStyle}
        className="relative min-h-[100svh] overflow-hidden bg-[#07070B] lg:h-[100svh]"
      >
        <GamesHudGrid />

        <style>{`
          .cyber-scroll { scrollbar-width: thin; scrollbar-color: color-mix(in srgb, var(--accent) 55%, transparent) rgba(255,255,255,.05); }
          .cyber-scroll::-webkit-scrollbar { width: 5px; }
          .cyber-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,.03); }
          .cyber-scroll::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--accent) 55%, transparent); border-radius: 4px; }
          .cyber-scroll::-webkit-scrollbar-thumb:hover { background: var(--accent); }
        `}</style>

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1500px] flex-col px-4 pb-5 pt-24 sm:px-8 lg:h-full lg:pb-8">
          
          <header className="mb-6 flex shrink-0 flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between transition-colors duration-1000" style={{ borderColor: 'color-mix(in srgb, var(--accent) 25%, transparent)' }}>
            <div className="max-w-xl">
              <div className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.28em] text-white/45">
                <Radio className="h-3 w-3 animate-pulse text-[var(--accent)] transition-colors duration-1000" />
                CATÁLOGO DE JOGOS
              </div>
              <h2 className="font-syne text-3xl font-extrabold uppercase leading-none tracking-tight text-[#F4F7FF] sm:text-5xl lg:text-6xl">
                Nossos <span className="text-[var(--accent)] transition-colors duration-1000">Jogos</span>
              </h2>
            </div>

            <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[.03] p-1 backdrop-blur-sm transition-colors duration-1000" style={{ borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)' }}>
              <button
                type="button"
                onClick={() => setViewMode("console")}
                className={`flex h-8 items-center gap-2 rounded-md px-3 font-cyber text-[10px] uppercase tracking-wider transition-colors ${viewMode === "console" ? "bg-[var(--accent)] font-bold text-[#07070B]" : "text-[#94A3B8] hover:text-white"}`}
              >
                <Rows3 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Lista</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("matrix")}
                className={`hidden md:flex h-8 items-center gap-2 rounded-md px-3 font-cyber text-[10px] uppercase tracking-wider transition-colors ${viewMode === "matrix" ? "bg-[var(--accent)] font-bold text-[#07070B]" : "text-[#94A3B8] hover:text-white"}`}
              >
                <Grid3X3 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Grade</span>
              </button>
            </div>
          </header>

          {viewMode === "console" ? (
            <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)]">
              
              <aside className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0A0D18]/60 backdrop-blur-md transition-colors duration-1000" style={{ borderColor: 'color-mix(in srgb, var(--accent) 25%, transparent)' }}>
                <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3" style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
                  <span className="font-syne text-xs font-bold uppercase tracking-wide text-[#F4F7FF]">
                    Catálogo
                  </span>
                  <span className="text-[11px] text-[#94A3B8]">
                    {games.length} jogos
                  </span>
                </div>

                <div className="cyber-scroll min-h-0 flex-1 space-y-1.5 overflow-y-auto p-2">
                  {games.map((game) => {
                    const active = game.id === selectedGame.id;
                    return (
                      <button
                        type="button"
                        key={game.id}
                        onClick={() => openGame(game)}
                        aria-current={active ? "true" : undefined}
                        className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-lg border p-2 text-left transition-colors duration-500 ${
                          active
                            ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] shadow-[0_0_15px_color-mix(in_srgb,var(--accent)_15%,transparent)]"
                            : "border-transparent hover:border-[var(--accent)]/40 hover:bg-white/[.03]"
                        }`}
                      >
                        {active && (
                          <span className="absolute bottom-1 left-0 top-1 w-[3px] rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
                        )}
                        <div className="relative h-[52px] w-[72px] shrink-0 overflow-hidden rounded-md border border-white/5 bg-black">
                          <img
                            src={game.image}
                            alt=""
                            className={`h-full w-full object-cover transition duration-500 ${active ? "scale-105" : "grayscale-[.65] group-hover:grayscale-0"}`}
                          />
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`truncate font-syne text-[13px] font-bold uppercase tracking-tight ${active ? "text-[var(--accent)]" : "text-[#B7C0CE] group-hover:text-white"}`}
                          >
                            {game.title}
                          </p>
                          <span
                            className={`mt-1 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wide ${game.released ? "text-white/70" : "text-[#F5B23A]"}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${game.released ? "bg-[var(--accent)]" : "bg-[#F5B23A]"}`}
                            />
                            {game.released ? "Disponível" : "Em desenvolvimento"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </aside>

              <AnimatePresence mode="wait">
                <motion.article
                  key={selectedGame.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative hidden min-h-0 flex-col overflow-hidden bg-[#0A0D18]/80 backdrop-blur-sm lg:flex transition-colors duration-1000"
                  style={{
                    borderStyle: "solid",
                    borderWidth: "32px",
                    borderImageSource: getFrameSvgUri(theme.accent),
                    borderImageSlice: "38 fill",
                  }}
                >
                  <div className="flex min-h-0 flex-1 overflow-hidden">
                    <div
                      className="relative h-full w-[42%] shrink-0 overflow-hidden border-r bg-[#07070B]"
                      style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}
                    >
                      {isPlayingVideo && videoId ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                          className="absolute inset-0 h-full w-full border-0"
                          allowFullScreen
                        />
                      ) : (
                        <>
                          <img
                            src={selectedGame.image}
                            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-xl"
                            alt=""
                          />
                          <div className="relative flex h-full w-full items-center justify-center p-6">
                            <img
                              src={selectedGame.image}
                              alt={selectedGame.title}
                              className="max-h-full max-w-full object-contain drop-shadow-2xl"
                            />
                          </div>
                          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A0D18] via-transparent to-transparent opacity-90" />

                          {videoId && (
                            <button
                              onClick={() => setIsPlayingVideo(true)}
                              className="absolute inset-0 z-20 flex items-center justify-center bg-[#07070B]/30 transition-colors hover:bg-[#07070B]/10 group"
                            >
                              <div className="grid h-16 w-16 place-items-center rounded-full bg-[var(--accent)] text-[#07070B] shadow-[0_0_15px_color-mix(in_srgb,var(--accent)_50%,transparent)] transition-transform hover:scale-105">
                                <Play className="ml-1 h-7 w-7 fill-current" />
                              </div>
                            </button>
                          )}
                        </>
                      )}
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                    <div className="cyber-scroll flex-1 space-y-5 overflow-y-auto p-7 bg-[#0A0D18]/30">
                      <div>
                        <h3 className="mb-2 font-syne text-3xl font-extrabold uppercase leading-[.95] tracking-tight text-[#F4F7FF]">
                          {selectedGame.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedGame.tags?.map((tag) => (
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

                      <p className="text-[15px] leading-7 text-[#94A3B8]">
                        {selectedGame.longDescription || selectedGame.description}
                      </p>

                      <div>
                        <button
                          onClick={() => setShowTeam(!showTeam)}
                          className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-[#07070B]/50 p-3 font-syne text-xs font-bold uppercase text-[#F4F7FF] transition hover:border-[var(--accent)]/40"
                        >
                          <span className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-[var(--accent)]" />{" "}
                            Equipe de desenvolvimento
                          </span>
                          {showTeam ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
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
                              <div className="mt-2 space-y-2 rounded-lg border border-white/10 bg-[#07070B]/50 p-4">
                                {selectedGame.team?.length ? (
                                  selectedGame.team.map((member) => (
                                    <div
                                      key={`${member.name}-${member.role}`}
                                      className="flex justify-between gap-4 border-b border-white/5 pb-2 text-sm last:border-0 last:pb-0"
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

                    <div className="shrink-0 border-t p-6 bg-[#07070B]/40" style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
                      {selectedGame.playUrl ? (
                        <a
                          href={selectedGame.playUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] font-cyber text-[12px] font-bold uppercase tracking-[0.1em] text-[#07070B] transition hover:brightness-110 shadow-[0_0_15px_color-mix(in_srgb,var(--accent)_30%,transparent)]"
                        >
                          <Gamepad2 className="h-5 w-5" /> Jogar agora
                        </a>
                      ) : (
                        <div className="flex h-12 items-center justify-center rounded-lg border border-white/10 bg-white/[.02] font-cyber text-[11px] uppercase tracking-[0.1em] text-[#94A3B8]">
                          Em desenvolvimento
                        </div>
                      )}
                    </div>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="cyber-scroll grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {games.map((game) => (
                <motion.button
                  type="button"
                  key={game.id}
                  onClick={() => openGame(game)}
                  whileHover={{ y: -4 }}
                  className="group relative min-h-[230px] overflow-hidden rounded-xl border border-white/10 bg-white/[.02] text-left transition-colors hover:border-[var(--accent)]/50"
                >
                  <img
                    src={game.image}
                    alt={game.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070B] via-[#07070B]/40 to-transparent opacity-90" />

                  <span
                    className={`absolute left-4 top-4 rounded-md border px-2 py-1 font-cyber text-[9px] uppercase tracking-widest ${
                      game.released
                        ? "border-[var(--accent)]/40 bg-[#07070B]/75 text-[var(--accent)]"
                        : "border-[#F5B23A]/40 bg-[#07070B]/75 text-[#F5B23A]"
                    }`}
                  >
                    {game.released ? "Disponível" : "Em desenvolvimento"}
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-syne text-2xl font-extrabold uppercase leading-none tracking-tight text-[#F4F7FF]">
                      {game.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="absolute bottom-5 right-5 h-5 w-5 text-[#94A3B8] transition group-hover:text-[var(--accent)]" />
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <GameModal
        isOpen={Boolean(modalGame)}
        onClose={() => setModalGame(null)}
        game={modalGame}
      />
    </>
  );
};

export default GameGrid;