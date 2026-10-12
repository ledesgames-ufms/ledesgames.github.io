import { ArrowUpRight } from "lucide-react";
import { Game } from "@/data/Games";

interface GridModeProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
}

export const GridMode = ({ games, onSelectGame }: GridModeProps) => {
  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {games.map((game) => (
          <article
            key={game.id}
            onClick={() => onSelectGame(game)}
            className="group relative bg-[#08080A] border border-white/15 hover:border-[#0051ff] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer rounded-lg shadow-lg"
          >
            <div className="relative aspect-[16/11] overflow-hidden bg-black">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-transparent opacity-80" />

              <div className="absolute top-2 left-2 right-2 flex items-center justify-between font-mono text-[8px]">
                <span className="px-1.5 py-0.5 bg-black/70 border border-white/10 text-white/80 rounded-sm">
                  {game.released ? "LANÇADO" : "EM DESENVOLVIMENTO"}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex flex-wrap gap-1">
                {game.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[8px] text-[#9999A5] bg-white/[0.03] px-1.5 py-0.5 border border-white/10 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="font-display text-2xl text-white uppercase tracking-wider group-hover:text-[#0051ff] transition-colors leading-tight truncate">
                {game.title}
              </h3>

              <p className="font-sans text-[11px] text-[#9999A5] line-clamp-2 leading-relaxed">
                {game.description}
              </p>
            </div>

            <div className="p-4 pt-0 flex items-center justify-between border-t border-white/10 pt-3 mt-auto">
              <span className="font-mono text-[9px] text-[#9999A5]">
                {game.developmentDates?.start}
              </span>
              <span className="font-mono text-[10px] text-white group-hover:text-[#0051ff] font-bold flex items-center gap-1">
                <span>ABRIR</span>
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
