import React, { ReactNode } from 'react';

export function FrameHudCiberpunk({ children }: { children: ReactNode }) {
  return (
    <div className="relative p-4 group inline-block w-full">
      
      <div 
        className="relative z-10 w-full h-full overflow-hidden"
        style={{
          clipPath: 'polygon(14.9% 0%, 100% 0%, 100% 78.5%, 85.7% 100%, 0% 100%, 0% 21.5%)'
        }}
      >
        {children}
      </div>

      <svg 
        className="absolute inset-0 w-full h-full text-verde-agua pointer-events-none drop-shadow-[0_0_12px_rgba(41,255,198,0.4)] z-20" 
        preserveAspectRatio="none" 
        viewBox="0 0 1792 1245" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M267.227 0H1775.61C1784.54 0 1791.78 7.25 1791.78 16.1797V976.879C1791.78 981.34 1789.97 985.391 1787.05 988.309L1535.99 1239.36C1532.83 1242.52 1528.69 1244.1 1524.56 1244.1H16.1719C7.24219 1244.1 0 1236.86 0 1227.93V267.23C0 262.77 1.8125 258.719 4.73828 255.801L255.793 4.73828C258.949 1.58984 263.086 0.0078125 267.227 0.0078125V0ZM293.457 79.5H398.68L445.836 32.3477H1759.44V550.5L1712.28 597.66V950.648L1498.33 1164.6H1393.1L1345.95 1211.76H32.3438V693.598L79.5 646.449V293.457L293.457 79.5Z" 
          fill="currentColor" 
        />
      </svg>

    </div>
  );
}
