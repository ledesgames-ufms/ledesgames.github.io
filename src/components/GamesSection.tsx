import { useState } from "react";
import { Tv, Rows3, Grid3X3 } from "lucide-react";
import { games, Game } from "@/data/Games";
import GameModal from "@/components/GameModal";
import { ShowcaseMode, ConsoleMode, GridMode } from "@/components/GamesDisplayModes";
import { THEME } from "@/constants/theme";

type ViewMode = "showcase" | "console" | "grid";

const GamesSection = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("showcase");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalGame, setModalGame] = useState<Game | null>(null);

  const theme = THEME.sections.games;

  return (
    <>
      <section
        id="games"
        style={{ backgroundColor: theme.bg }}
        className="relative py-28 text-white border-b border-white/10 overflow-hidden"
      >
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <header
            className={`flex flex-col md:flex-row md:items-end justify-between gap-6 ${
              viewMode === "showcase" ? "mb-4 sm:mb-6" : "mb-10 sm:mb-12"
            }`}
          >
            <div>
              <h2 className="font-display text-4xl sm:text-6xl tracking-wider text-white uppercase leading-none">
                Nossos <span style={{ color: theme.accent }}>Jogos</span>
              </h2>
            </div>

            {/* View Mode Selector */}
            <div className="flex items-center gap-1.5 border border-white/15 bg-white/[0.02] p-1">
              <button
                type="button"
                onClick={() => setViewMode("showcase")}
                className={`flex h-9 items-center gap-2 px-3.5 font-cyber text-xs uppercase tracking-wider transition-all ${
                  viewMode === "showcase"
                    ? "bg-[#0051ff] font-bold text-white shadow-md shadow-[#0051ff]/30"
                    : "text-[#9999A5] hover:text-white hover:bg-white/[0.04]"
                }`}
                title="Modo Showcase"
              >
                <Tv className="h-3.5 w-3.5" />
                <span>Showcase</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("console")}
                className={`flex h-9 items-center gap-2 px-3.5 font-cyber text-xs uppercase tracking-wider transition-all ${
                  viewMode === "console"
                    ? "bg-[#0051ff] font-bold text-white shadow-md shadow-[#0051ff]/30"
                    : "text-[#9999A5] hover:text-white hover:bg-white/[0.04]"
                }`}
                title="Modo Console"
              >
                <Rows3 className="h-3.5 w-3.5" />
                <span>Console</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex h-9 items-center gap-2 px-3.5 font-cyber text-xs uppercase tracking-wider transition-all ${
                  viewMode === "grid"
                    ? "bg-[#0051ff] font-bold text-white shadow-md shadow-[#0051ff]/30"
                    : "text-[#9999A5] hover:text-white hover:bg-white/[0.04]"
                }`}
                title="Modo Grade de Posters"
              >
                <Grid3X3 className="h-3.5 w-3.5" />
                <span>Posters</span>
              </button>
            </div>
          </header>
        </div>

        {/* Display Modes */}
        {viewMode === "showcase" && (
          <ShowcaseMode
            games={games}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onSelectGame={setModalGame}
          />
        )}

        {viewMode === "console" && (
          <ConsoleMode
            games={games}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onSelectGame={setModalGame}
          />
        )}

        {viewMode === "grid" && (
          <GridMode
            games={games}
            onSelectGame={setModalGame}
          />
        )}
      </section>

      <GameModal
        isOpen={Boolean(modalGame)}
        onClose={() => setModalGame(null)}
        game={modalGame}
      />
    </>
  );
};

export default GamesSection;
