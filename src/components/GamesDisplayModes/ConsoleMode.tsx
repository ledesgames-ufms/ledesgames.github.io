import { Play, ArrowUpRight } from "lucide-react";
import { Game } from "@/data/Games";

interface ConsoleModeProps {
  games: Game[];
  currentIndex: number;
  setCurrentIndex: (idx: number) => void;
  onSelectGame: (game: Game) => void;
}

export const ConsoleMode = ({
  games,
  currentIndex,
  setCurrentIndex,
  onSelectGame,
}: ConsoleModeProps) => {
  const activeGame = games[currentIndex] || games[0];

  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Project Index */}
        <div className="lg:col-span-5 bg-[#08080A] border border-white/15 divide-y divide-white/5 rounded-lg overflow-hidden">
          <div className="p-4 bg-white/[0.02] border-b border-white/10 flex items-center justify-between font-mono text-[10px] text-[#9999A5] uppercase tracking-wider">
            <span>PROJETOS</span>
            <span>TOTAL: {games.length}</span>
          </div>

          <div className="divide-y divide-white/5">
            {games.map((game, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <div
                  key={game.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`p-4 flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#0051ff]/10 border-l-4 border-l-[#0051ff]"
                      : "hover:bg-white/[0.02] border-l-4 border-l-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="min-w-0">
                      <h4
                        className={`font-display text-lg tracking-wide uppercase truncate ${
                          isSelected ? "text-white" : "text-[#D4D4D8]"
                        }`}
                      >
                        {game.title}
                      </h4>
                      <div className="flex items-center gap-2 font-mono text-[10px] text-[#9999A5] truncate">
                        <span>{game.tags.slice(0, 2).join(", ")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <span
                      className={`px-2 py-0.5 font-mono text-[8px] uppercase border rounded-sm ${
                        game.released
                          ? "border-[#0051ff]/40 bg-[#0051ff]/10 text-[#0051ff]"
                          : "border-white/20 bg-white/[0.02] text-[#9999A5]"
                      }`}
                    >
                      {game.released ? "LANÇADO" : "EM DESENVOLVIMENTO"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Inspection Panel */}
        <div className="lg:col-span-7 bg-[#08080A] border border-white/15 p-6 sm:p-8 space-y-6 rounded-lg">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[10px] text-[#9999A5]">
            <span className="text-[#0051ff]">
              STATUS: {activeGame.released ? "DISPONÍVEL" : "EM DESENVOLVIMENTO"}
            </span>
          </div>

          <div className="relative aspect-video bg-black overflow-hidden border border-white/10 rounded-lg">
            <img
              src={activeGame.image}
              alt={activeGame.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-wider mb-2">
              {activeGame.title}
            </h3>
            <p className="font-sans text-sm text-[#9999A5] leading-relaxed">
              {activeGame.longDescription || activeGame.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-4 font-mono text-xs">
            <div>
              <span className="text-[#9999A5] block text-[10px] uppercase">Tags</span>
              <span className="text-white font-medium">{activeGame.tags.join(", ")}</span>
            </div>
            <div>
              <span className="text-[#9999A5] block text-[10px] uppercase">Período de Produção</span>
              <span className="text-white font-medium">{activeGame.developmentDates?.start}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={activeGame.playUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#0051ff] text-white hover:bg-white hover:text-black font-cyber font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 rounded-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Jogar no Itch.io</span>
            </a>

            <button
              type="button"
              onClick={() => onSelectGame(activeGame)}
              className="px-5 py-3 bg-white/[0.04] border border-white/20 text-white hover:border-[#0051ff] font-cyber font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 rounded-sm"
            >
              <span>Detalhes</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
