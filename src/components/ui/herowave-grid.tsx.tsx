import { useEffect, useRef } from "react";

export function HeroWaveGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const fov = 350;
    const cameraY = 160;
    const gridSpacing = 60;
    const cols = 60;
    const rows = 35;

    const render = () => {
      time += 0.0018;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const horizonY = height * 0.45;

      const points: { x: number; y: number; opacity: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        points[r] = [];
        const z = r * gridSpacing + 10;
        const scale = fov / z;

        const zFade = Math.min(1, (z - 5) / 30);
        const horizonFade = Math.max(0, 1 - (z / (rows * gridSpacing)));
        const rowOpacity = zFade * horizonFade;

        for (let c = 0; c < cols; c++) {
          const worldX = (c - cols / 2) * gridSpacing;

          const valX1 = 1 - Math.abs(Math.sin(worldX * 0.01 + time));
          const valZ1 = 1 - Math.abs(Math.cos(z * 0.01 + time));
          const peak1 = Math.pow(valX1 * valZ1, 1.2);

          const valX2 = 1 - Math.abs(Math.sin(worldX * 0.006 - time * 0.8));
          const valZ2 = 1 - Math.abs(Math.cos(z * 0.006 - time * 0.8));
          const peak2 = Math.pow(valX2 * valZ2, 1.5);

          const waveHeight = (peak1 * 38) + (peak2 * 22);

          const screenX = centerX + worldX * scale;
          const screenY = horizonY + (cameraY - waveHeight) * scale;

          points[r][c] = { x: screenX, y: screenY, opacity: rowOpacity };
        }
      }

      ctx.lineWidth = 0.8;

      // Desenhando linhas horizontais sem brilho/shadow
      for (let r = 0; r < rows; r++) {
        if (!points[r] || !points[r][0] || points[r][0].opacity === 0) continue;
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const pt = points[r][c];
          if (c === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = `rgba(41, 255, 198, ${Math.min(0.6, points[r][0].opacity * 0.5)})`;
        ctx.stroke();
      }

      // Desenhando linhas verticais sem brilho/shadow
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        let hasMoved = false;
        for (let r = 0; r < rows; r++) {
          const pt = points[r][c];
          if (!pt || pt.opacity === 0) continue;
          if (!hasMoved) {
            ctx.moveTo(pt.x, pt.y);
            hasMoved = true;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.strokeStyle = `rgba(41, 255, 198, 0.18)`;
        ctx.stroke();
      }

      // Encruzilhadas
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const pt = points[r][c];
          if (pt && pt.opacity > 0.15) {
            const size = 2.5;
            ctx.beginPath();
            ctx.moveTo(pt.x - size, pt.y);
            ctx.lineTo(pt.x + size, pt.y);
            ctx.moveTo(pt.x, pt.y - size);
            ctx.lineTo(pt.x, pt.y + size);
            
            ctx.strokeStyle = `rgba(41, 255, 198, ${pt.opacity * 0.7})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

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
      className="absolute inset-0 z-0 overflow-hidden bg-transparent pointer-events-none"
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 95%)",
        maskImage: "linear-gradient(to bottom, black 50%, transparent 95%)",
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

export default HeroWaveGrid;