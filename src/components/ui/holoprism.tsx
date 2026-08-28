import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HoloPrismProps {
  image?: string;
  size?: number;
  tiltX?: number;
  tiltZ?: number;
  initialAngleY?: number;
  opacity?: number;
  floatDuration?: number;
  floatDelay?: number;
  floatOffset?: number;
}

type Point2D = { x: number; y: number };

function convexHull(points: Point2D[]): Point2D[] {
  const pts = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
  if (pts.length <= 1) return pts;

  const cross = (o: Point2D, a: Point2D, b: Point2D) =>
    (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

  const lower: Point2D[] = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
      lower.pop();
    }
    lower.push(p);
  }

  const upper: Point2D[] = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
      upper.pop();
    }
    upper.push(p);
  }

  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

export function HoloPrism({
  image,
  size = 220,
  tiltX = -28,
  tiltZ = -5,
  initialAngleY = 35,
  opacity = 1,
  floatDuration = 4.5,
  floatDelay = 0,
  floatOffset = 12,
}: HoloPrismProps) {
  const { scrollYProgress } = useScroll();
  const rotateY = useTransform(scrollYProgress, [0, 1], [initialAngleY, initialAngleY + 360]);
  const [clipPath, setClipPath] = useState("none");
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame: number;

    const updateClipPath = () => {
      if (!cubeRef.current || !image) return;

      const s = size / 2;
      
      // 8 Vértices tridimensionais do cubo
      const vertices = [
        { x: -s, y: -s, z: s }, { x: s, y: -s, z: s },
        { x: s, y: s, z: s }, { x: -s, y: s, z: s },
        { x: -s, y: -s, z: -s }, { x: s, y: -s, z: -s },
        { x: s, y: s, z: -s }, { x: -s, y: s, z: -s }
      ];

      const currentRotateY = rotateY.get() * (Math.PI / 180);
      const radTiltX = tiltX * (Math.PI / 180);
      const radTiltZ = tiltZ * (Math.PI / 180);

      const projectedPoints = vertices.map((v) => {
        // 1. Rotação Eixo Z (Framer Motion aplica de trás pra frente: Z -> Y -> X)
        const x1 = v.x * Math.cos(radTiltZ) - v.y * Math.sin(radTiltZ);
        const y1 = v.x * Math.sin(radTiltZ) + v.y * Math.cos(radTiltZ);
        const z1 = v.z;

        // 2. Rotação Eixo Y
        const x2 = x1 * Math.cos(currentRotateY) + z1 * Math.sin(currentRotateY);
        const y2 = y1;
        const z2 = -x1 * Math.sin(currentRotateY) + z1 * Math.cos(currentRotateY);

        // 3. Rotação Eixo X
        const x3 = x2;
        const y3 = y2 * Math.cos(radTiltX) - z2 * Math.sin(radTiltX);
        const z3 = y2 * Math.sin(radTiltX) + z2 * Math.cos(radTiltX);

        // 4. Projeção de Perspectiva
        const perspective = 1000;
        const scale = perspective / (perspective - z3);

        const xProj = x3 * scale;
        const yProj = y3 * scale;

        // Converte para porcentagem para criar a máscara de recorte
        return {
          x: ((xProj + s) / size) * 100,
          y: ((yProj + s) / size) * 100,
        };
      });

      const hull = convexHull(projectedPoints);
      if (hull.length >= 3) {
        setClipPath(`polygon(${hull.map((p) => `${p.x.toFixed(2)}% ${p.y.toFixed(2)}%`).join(", ")})`);
      }

      animationFrame = requestAnimationFrame(updateClipPath);
    };

    animationFrame = requestAnimationFrame(updateClipPath);
    return () => cancelAnimationFrame(animationFrame);
  }, [rotateY, size, tiltX, tiltZ, image]);

  const halfSize = size / 2;
  const faces = [
    { transform: `rotateY(0deg) translateZ(${halfSize}px)` },
    { transform: `rotateY(90deg) translateZ(${halfSize}px)` },
    { transform: `rotateY(180deg) translateZ(${halfSize}px)` },
    { transform: `rotateY(270deg) translateZ(${halfSize}px)` },
    { transform: `rotateX(90deg) translateZ(${halfSize}px)` },
    { transform: `rotateX(-90deg) translateZ(${halfSize}px)` },
  ];

  return (
    <motion.div
      className="relative flex items-center justify-center pointer-events-none select-none"
      style={{ width: size, height: size, opacity }}
      animate={{ y: [0, -floatOffset, 0] }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
    >
      {image && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ clipPath }}
        >
          <img
            src={image}
            alt=""
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] max-w-none object-cover contrast-110"
          />
        </div>
      )}

      <div className="absolute inset-0 z-10 pointer-events-none" style={{ perspective: "1000px" }}>
        <motion.div
          ref={cubeRef}
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d", rotateX: tiltX, rotateZ: tiltZ, rotateY }}
        >
          {faces.map((face, index) => (
            <div
              key={index}
              className="absolute inset-0 border-2 border-[#29FFC6] bg-[#0B1020]/20 backdrop-blur-[1px] shadow-[0_0_15px_rgba(41,255,198,0.25)]"
              style={{ transform: face.transform, backfaceVisibility: "hidden" }}
            >
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#29FFC6]" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#29FFC6]" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#29FFC6]" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#29FFC6]" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#29FFC6]/15 via-transparent to-[#29FFC6]/10" />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}