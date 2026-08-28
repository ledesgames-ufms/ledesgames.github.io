import { useEffect, useRef } from "react";
import { useScrollColor } from "@/context/ScrollColorContext";

type Point = { x: number; y: number; opacity: number };

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const bigint = parseInt(full, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

export function HeroWaveGrid() {
  const { theme } = useScrollColor();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const targetRgbRef = useRef({ r: 41, g: 255, b: 198 });
  const currentRgbRef = useRef({ r: 41, g: 255, b: 198 });

  useEffect(() => {
    try {
      targetRgbRef.current = hexToRgb(theme.accent);
    } catch {
      // fallback
    }
  }, [theme.accent]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    let cols = 50;
    let rows = 30;
    let gridSpacing = 55;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      if (window.innerWidth < 768) {
        cols = 24;
        rows = 18;
        gridSpacing = 95;
      } else {
        cols = 50;
        rows = 30;
        gridSpacing = 55;
      }
    };
    window.addEventListener("resize", resize);
    resize();

    const fov = 320;
    const cameraY = 110;

    const projectLayer = (horizonY: number): Point[][] => {
      const points: Point[][] = [];
      const centerX = canvas.width / 2;

      for (let r = 0; r < rows; r++) {
        points[r] = [];
        const z = r * gridSpacing + 10;
        const scale = fov / z;

        const zFade = Math.min(1, (z - 5) / 25);
        const horizonFade = Math.max(0, 1 - z / (rows * gridSpacing));
        const rowOpacity = zFade * horizonFade;

        const valZ1 = 1 - Math.abs(Math.cos(z * 0.012 + time));
        const valZ2 = 1 - Math.abs(Math.cos(z * 0.007 - time * 0.7));

        for (let c = 0; c < cols; c++) {
          const worldX = (c - cols / 2) * gridSpacing;

          const valX1 = 1 - Math.abs(Math.sin(worldX * 0.012 + time));
          const peak1 = Math.pow(valX1 * valZ1, 1.3);

          const valX2 = 1 - Math.abs(Math.sin(worldX * 0.007 - time * 0.7));
          const peak2 = Math.pow(valX2 * valZ2, 1.6);

          const waveHeight = peak1 * 22 + peak2 * 14;

          const screenX = centerX + worldX * scale;
          const screenY = horizonY + (cameraY - waveHeight) * scale;

          points[r][c] = { x: screenX, y: screenY, opacity: rowOpacity };
        }
      }
      return points;
    };

    const drawLayer = (points: Point[][], r: number, g: number, b: number) => {
      for (let ri = 0; ri < points.length; ri++) {
        const row = points[ri];
        if (!row || !row[0] || row[0].opacity === 0) continue;
        ctx.beginPath();
        for (let c = 0; c < row.length; c++) {
          const pt = row[c];
          if (c === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(0.6, row[0].opacity * 0.5)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      const colCount = points[0]?.length ?? 0;
      for (let c = 0; c < colCount; c++) {
        ctx.beginPath();
        let moved = false;
        for (let ri = 0; ri < points.length; ri++) {
          const pt = points[ri][c];
          if (!pt || pt.opacity === 0) continue;
          if (!moved) {
            ctx.moveTo(pt.x, pt.y);
            moved = true;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.18)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    };

    const render = () => {
      time += 0.0015;
      
      currentRgbRef.current.r += (targetRgbRef.current.r - currentRgbRef.current.r) * 0.04;
      currentRgbRef.current.g += (targetRgbRef.current.g - currentRgbRef.current.g) * 0.04;
      currentRgbRef.current.b += (targetRgbRef.current.b - currentRgbRef.current.b) * 0.04;

      const r = Math.round(currentRgbRef.current.r);
      const g = Math.round(currentRgbRef.current.g);
      const b = Math.round(currentRgbRef.current.b);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const horizonY = canvas.height * 0.45;

      drawLayer(projectLayer(horizonY), r, g, b);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 85%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 85%, transparent 100%)",
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full block opacity-70" />
    </div>
  );
}

export default HeroWaveGrid;