import { type CSSProperties } from "react";
import { useScrollColor } from "@/context/ScrollColorContext";

export function GamesHudGrid() {
  const { theme } = useScrollColor();
  const encodedAccent = encodeURIComponent(theme.accent);

  const gridPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M0 .5H80M.5 0V80' fill='none' stroke='${encodedAccent}' stroke-width='1' opacity='.5'/%3E%3C/svg%3E")`;

  const style = { "--accent": theme.accent } as CSSProperties;

  return (
    <div
      style={style}
      className="absolute inset-0 z-0 overflow-hidden bg-[#07070B] pointer-events-none"
      aria-hidden="true"
    >
      <style>{`
        @keyframes gamesGridFlow {
          from { background-position: 0 0; }
          to { background-position: 0 80px; }
        }
        .games-grid-flow { animation: gamesGridFlow 9s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .games-grid-flow { animation: none; }
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,color-mix(in_srgb,var(--accent)_9%,transparent),transparent_45%)]" />
      <div className="absolute -left-[10%] top-[15%] h-[50%] w-[38%] rounded-full bg-[color-mix(in_srgb,var(--accent)_4%,transparent)] blur-[120px]" />

      <div className="absolute inset-0" style={{ perspective: "1000px" }}>
        <div
          className="games-grid-flow absolute -left-[40%] -right-[40%] -top-[35%] h-[180%]"
          style={{
            transform: "rotateX(30deg)",
            transformOrigin: "center 60%",
            backgroundImage: gridPattern,
            backgroundSize: "80px 80px",
            opacity: 0.22,
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 32%, black 78%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 32%, black 78%, transparent 100%)",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(7,7,11,.5)_60%,rgba(7,7,11,.97)_100%)]" />
    </div>
  );
}

export default GamesHudGrid;