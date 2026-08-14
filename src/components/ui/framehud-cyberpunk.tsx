import React, { ReactNode } from 'react';
import { useScrollColor } from '@/context/ScrollColorContext';

const getFrameSvgUri = (color: string) => {
  const encodedColor = encodeURIComponent(color);
  const svg = `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 299.928V300H0V265H0.0722656L35 299.928ZM300 205V260H299.916L260 299.917V300H40V299.916L0.0830078 260H0V205L5 200V256.333L43.667 295H256.333L295 256.333V200L300 205ZM260 0.0839844L299.917 40H300V95L295 100V43.667L256.333 5H43.667L5 43.667V100L0 95V40H0.0839844L40 0.0830078V0H260V0.0839844ZM300 26V35H299.928L265 0.0722656V0H274L300 26ZM300 21.0508L278.949 0H300V21.0508Z" fill="${encodedColor}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

export function FrameHudCiberpunk({ children }: { children: ReactNode }) {
  const { theme } = useScrollColor();

  return (
    <div className="relative w-full inline-block">
      
      <div
        className="absolute inset-0 z-20 pointer-events-none transition-all duration-1000"
        style={{
          borderStyle: 'solid',
          borderWidth: '42px',
          borderColor: 'transparent',
          borderImageSource: getFrameSvgUri(theme.accent),
          borderImageSlice: '45',
          borderImageRepeat: 'stretch'
        }}
      />

      <div 
        className="relative z-10 w-full h-full overflow-hidden rounded-sm"
        style={{
          clipPath: 'polygon(40px 0px, calc(100% - 40px) 0px, 100% 40px, 100% calc(100% - 40px), calc(100% - 40px) 100%, 40px 100%, 0px calc(100% - 40px), 0px 40px)'
        }}
      >
        <div className="w-full h-full">
          {children}
        </div>
      </div>
      
    </div>
  );
}

export default FrameHudCiberpunk;