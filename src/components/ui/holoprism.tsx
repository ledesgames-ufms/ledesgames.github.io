import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useAnimationFrame } from "framer-motion";

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

const CORNER_SIGNS: [number, number, number][] = [
  [-1, -1, -1],
  [-1, -1, 1],
  [-1, 1, -1],
  [-1, 1, 1],
  [1, -1, -1],
  [1, -1, 1],
  [1, 1, -1],
  [1, 1, 1],
];

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
  const containerRef = useRef<HTMLDivElement>(null);
  const cornerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [clipPathStyle, setClipPathStyle] = useState<string>("none");

  const { scrollYProgress } = useScroll();

  const cubeRotationY = useTransform(
    scrollYProgress,
    [0, 1],
    [initialAngleY, initialAngleY + 360]
  );

  const halfSize = size / 2;

  useAnimationFrame(() => {
    if (!image || !containerRef.current) return;

    const cRect = containerRef.current.getBoundingClientRect();
    if (cRect.width === 0 || cRect.height === 0) return;

    const points: Point2D[] = [];

    for (let i = 0; i < 8; i++) {
      const el = cornerRefs.current[i];
      if (el) {
        const r = el.getBoundingClientRect();
        points.push({
          x: r.left + r.width / 2 - cRect.left,
          y: r.top + r.height / 2 - cRect.top,
        });
      }
    }

    if (points.length === 8) {
      const hull = convexHull(points);
      if (hull.length >= 3) {
        const polygonStr = hull
          .map((p) => `${p.x.toFixed(1)}px ${p.y.toFixed(1)}px`)
          .join(", ");
        setClipPathStyle(`polygon(${polygonStr})`);
      }
    }
  });

  const faces = [
    { transform: `rotateY(0deg) translateZ(${halfSize}px)` },
    { transform: `rotateY(90deg) translateZ(${halfSize}px)` },
    { transform: `rotateY(180deg) translateZ(${halfSize}px)` },
    { transform: `rotateY(270deg) translateZ(${halfSize}px)` },
    { transform: `rotateX(90deg) translateZ(${halfSize}px)` },
    { transform: `rotateX(-90deg) translateZ(${halfSize}px)` },
  ];

  return (
    /* CONTAINER PRINCIPAL COM EFEITO DE FLUTUAÇÃO */
    <motion.div
      ref={containerRef}
      animate={{
        y: [0, -floatOffset, 0],
      }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: floatDelay,
      }}
      className="relative flex items-center justify-center pointer-events-none select-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        opacity: opacity,
      }}
    >
      {/* CAMADA DA IMAGEM REVELADA PELA SILHUETA DO CUBO */}
      {image && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            clipPath: clipPathStyle,
            WebkitClipPath: clipPathStyle,
          }}
        >
          <img
            src={image}
            alt="Holo Content"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] max-w-none object-cover contrast-110"
          />
        </div>
      )}

      {/* 2. ESTRUTURA 3D DO CUBO */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${tiltX}deg) rotateZ(${tiltZ}deg)`,
          }}
        >
          <motion.div
            className="relative w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              rotateY: cubeRotationY,
            }}
          >
            {faces.map((face, index) => (
              <div
                key={index}
                className="absolute inset-0 border border-[#0051ff]/50 bg-[#08080A]/60 backdrop-blur-[1px] rounded-none overflow-hidden"
                style={{
                  transform: face.transform,
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Cantos Clean */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#0051ff]" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#0051ff]" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#0051ff]" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#0051ff]" />

                {/* Brilho do vidro */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0051ff]/10 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}

            {CORNER_SIGNS.map(([sx, sy, sz], i) => (
              <div
                key={`corner-${i}`}
                ref={(el) => {
                  cornerRefs.current[i] = el;
                }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: "1px",
                  height: "1px",
                  transform: `translate3d(${sx * halfSize}px, ${sy * halfSize}px, ${sz * halfSize}px)`,
                  pointerEvents: "none",
                  opacity: 0,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}