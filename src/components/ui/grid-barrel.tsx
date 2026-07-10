import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface GridBarrelProps {
  y: MotionValue<number>; 
}

export function GridBarrel({ y }: GridBarrelProps) {
  const amplitude = 18; 
  const isInverse = true; 

  return (
    <motion.div 
      style={{ y }} 
      className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
    >
      <div 
        className="absolute inset-0 w-full h-full opacity-35"
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 15%, black 80%)',
          maskImage: 'radial-gradient(ellipse at center, transparent 15%, black 80%)',
        }}
      >
        <svg 
          className="w-full h-full text-verde-agua" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="currentColor" strokeWidth="0.3" fill="none">
            
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((x) => {
              const caY = amplitude * ((50 - x) / 50);
              const startX = isInverse ? x - caY : x;
              const endX = isInverse ? x - caY : x;
              const cx = isInverse ? x + caY : x + (caY * 2);

              return (
                <path 
                  key={`v-${x}`} 
                  d={`M ${startX},0 Q ${cx},50 ${endX},100`} 
                  vectorEffect="non-scaling-stroke" 
                />
              );
            })}

            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((Y) => {
              const caX = amplitude * ((50 - Y) / 50);
              const startY = isInverse ? Y - caX : Y;
              const endY = isInverse ? Y - caX : Y;
              const cy = isInverse ? Y + caX : Y + (caX * 2);

              return (
                <path 
                  key={`h-${Y}`} 
                  d={`M 0,${startY} Q 50,${cy} 100,${endY}`} 
                  vectorEffect="non-scaling-stroke" 
                />
              );
            })}
          </g>
        </svg>
      </div>
    </motion.div>
  );
}
