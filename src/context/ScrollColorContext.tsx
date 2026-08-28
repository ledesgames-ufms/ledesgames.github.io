import React, { createContext, useContext, useState, useEffect } from 'react';

export type SectionId = 'hero' | 'games' | 'research' | 'about' | 'contact';

export interface SectionTheme {
  accent: string;
  accentGlow: string;
  bg: string;
}

const THEMES: Record<SectionId, SectionTheme> = {
  hero: { accent: '#0051ff', accentGlow: 'rgba(0, 81, 255, 0.25)', bg: '#08080A' },
  games: { accent: '#0051ff', accentGlow: 'rgba(0, 81, 255, 0.25)', bg: '#08080A' },
  research: { accent: '#0051ff', accentGlow: 'rgba(0, 81, 255, 0.25)', bg: '#08080A' },
  about: { accent: '#0051ff', accentGlow: 'rgba(0, 81, 255, 0.25)', bg: '#08080A' },
  contact: { accent: '#0051ff', accentGlow: 'rgba(0, 81, 255, 0.25)', bg: '#08080A' },
};

interface ScrollColorContextType {
  activeSection: SectionId;
  theme: SectionTheme;
}

const ScrollColorContext = createContext<ScrollColorContextType | undefined>(undefined);

export const ScrollColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');

  useEffect(() => {

    const handleScroll = () => {
      const sections: SectionId[] = ['hero', 'games', 'research', 'about', 'contact'];
      const scrollPosition = window.scrollY + (window.innerHeight * 0.20);

      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const absoluteTop = top + window.scrollY;
          const absoluteBottom = bottom + window.scrollY;

          if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    setTimeout(handleScroll, 100); 
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = THEMES[activeSection] || THEMES.hero;

  return (
    <ScrollColorContext.Provider value={{ activeSection, theme }}>
      {children}
    </ScrollColorContext.Provider>
  );
};

export const useScrollColor = () => {
  const context = useContext(ScrollColorContext);
  if (!context) throw new Error('useScrollColor precisa estar num ScrollColorProvider');
  return context;
};