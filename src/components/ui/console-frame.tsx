import React from 'react';
import { useScrollColor } from '@/context/ScrollColorContext';

interface ConsoleFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function ConsoleFrame({ children, className = '' }: ConsoleFrameProps) {
  const { theme } = useScrollColor();
  
  const svgString = `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 299.928V300H0V265H0.0722656L35 299.928ZM300 205V260H299.916L260 299.917V300H40V299.916L0.0830078 260H0V205L5 200V256.333L43.667 295H256.333L295 256.333V200L300 205ZM300 300H265V299.928L299.928 265H300V300ZM51 285H249L284 250H290V252.667L252.667 290H47.333L10 252.667V250H16L51 285ZM260 0.0839844L299.917 40H300V95L295 100V43.667L256.333 5H43.667L5 43.667V100L0 95V40H0.0839844L40 0.0830078V0H260V0.0839844ZM290 47.333V50H284L249 15H51L16 50H10V47.333L47.333 10H252.667L290 47.333ZM35 0.0722656L0.0722656 35H0V0H35V0.0722656ZM300 35H299.928L265 0.0722656V0H300V35Z" fill="${theme.accent}"/></svg>`;

  const borderImageUri = `url("data:image/svg+xml,${encodeURIComponent(svgString)}")`;

  return (
    <div className={`relative flex flex-col ${className}`}>
      <div
        className="absolute inset-0 z-50 pointer-events-none transition-all duration-1000"
        style={{
          borderStyle: 'solid',
          borderWidth: '40px',
          borderColor: 'transparent',
          borderImageSource: borderImageUri,
          borderImageSlice: '55',
          borderImageRepeat: 'stretch'
        }}
      />
      
      <div className="absolute inset-[2px] z-0 bg-[#07070B]/60 backdrop-blur-md transition-colors duration-1000" />
      
      <div className="relative z-40 flex flex-col h-full pt-8 px-6 pb-10 sm:px-8">
        {children}
      </div>
    </div>
  );
}

export default ConsoleFrame;